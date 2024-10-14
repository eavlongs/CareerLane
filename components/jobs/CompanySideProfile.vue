<template>
    <div class="flex flex-col items-center">
        <UAvatar :src="logo_url ? prefixStorageUrl(logo_url)! : COMPANY_LOGO_FALLBACK" size="3xl"
          img-class="object-contain" class="border" />
        <p class="text-base md:text-lg font-semibold mt-4">
            {{ company_name }}
        </p>
        <p class="text-sm md:text-base">
            {{ company_location }}
        </p>

        <UButton class="mt-6" size="lg">Apply Now</UButton>
    </div>
</template>

<script lang="ts" setup>
type Props = {
    logo_url: string;
    company_name: string;
    company_location: string;
}

const props = defineProps<Props>();
</script>

<style></style>