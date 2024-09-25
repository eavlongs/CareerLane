<template>
    <Section :title="title" :class="props.class" link-for-see-all-btn="/companies" see-all-text="See All Companies"
      :no-data="companies.length == 0" :handle-no-data="{
        hide: true,
    }">
        <div
          class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 justify-center gap-2 sm:gap-4 xl:gap-y-6 mx-auto">
            <template v-for="c in companies" :key="c.id">
                <NuxtLink :to="`/companies/${c.id}`" class="mx-auto"> <img
                      :src="prefixStorageUrl(c.logo_url) ?? COMPANY_LOGO_FALLBACK"
                      class="w-28 h-28 sm:w-36 sm:h-36 aspect-square object-contain" />
                </NuxtLink>
            </template>
        </div>
    </Section>
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