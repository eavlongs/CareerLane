<template>
    <a :href="href">
        <UButton color="white" size="xl" class="justify-center w-[100%]">

            <img :src="providerLogo" :alt="`${providerName} Logo`" class="w-7 aspect-square" />

            Continue With {{ props.providerName }}
        </UButton>
    </a>
</template>

<script lang="ts" setup>
type Props = {
    providerName: string;
    providerLogo: string;
    href: string;
};

const props = defineProps<Props>();
</script>

<style></style>
