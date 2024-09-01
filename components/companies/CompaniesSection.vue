<template>
    <PostSection :title="title" :class="props.class" link-for-see-all-btn="/companies" see-all-text="See All Companies">
        <div class="flex flex-wrap gap-4">
            <template v-for="c in companies" :key="c.id">
                <NuxtLink :to="`/companies/${c.id}`"> <img :src="c.logo" class="w-36 h-36 aspect-square object-cover" />
                </NuxtLink>
            </template>
        </div>
    </PostSection>
</template>

<script lang="ts" setup>
import type { Company } from '~/utils/types';

type Props = {
    companies: Company[],
    title: string;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    class: ""
})
</script>

<style></style>