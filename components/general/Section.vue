<template>
    <template v-if="!noData || (noData && !handleNoData.hide)">
        <div class="section" :class="props.class">
            <div class="flex items-center justify-between mb-4">
                <p class="text-xl font-semibold">{{ title }}</p>
                <slot name="buttons" />
            </div>
            <template v-if="noData">
                <p class="text-center">{{ handleNoData.text }}</p>
            </template>
            <template v-else>
                <slot />
                <template v-if="linkForSeeAllBtn">
                    <div class="flex mt-4">
                        <UButton class="block ml-auto" variant="link" :to="linkForSeeAllBtn">
                            <template v-if="seeAllText">{{ seeAllText }}</template>
                            <template v-else>See All {{ title }}</template>
                        </UButton>
                    </div>
                </template>
                <template v-else-if="pagination">
                    <div class="flex justify-center mt-6">
                        <UPagination :max="5" :page-count="pagination.per_page" :total="pagination.total"
                          :model-value="pagination.current_page" @update:model-value="onPageChange" />
                    </div>
                </template>

                <!-- TODO: add a condition for pagination -->
            </template>
        </div>
    </template>
</template>

<script lang="ts" setup>
import type { PaginationMetaData } from '~/utils/types';
type Props = {
    title: string;
    class?: string;
    linkForSeeAllBtn?: string;
    seeAllText?: string;
    handleNoData?: {
        hide: boolean;
        text?: string;
    };
    noData: boolean;
    pagination?: PaginationMetaData
}

const props = withDefaults(defineProps<Props>(), {
    class: "",
    handleNoData: {
        hide: false,
        text: "No data found"
    }
})

const emits = defineEmits(["pageChange"]);

const onPageChange = (page: number) => {
    emits("pageChange", page);
}
</script>

<style></style>