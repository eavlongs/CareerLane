<template>
    <a :href="href">
        <UButton color="white" size="xl" class="text-center w-[100%]">
            <template v-if="props.providerName === 'Google'">
                <img
                    src="https://avatars.githubusercontent.com/u/739984?v=4"
                    alt="Google Logo"
                    class="w-7 aspect-square"
                />
            </template>
            <template v-else-if="props.providerName === 'Facebook'">
                <img
                    src="https://avatars.githubusercontent.com/u/739984?v=4"
                    alt="Facebook Logo"
                    class="w-7 aspect-square"
                />
            </template>
            <template v-else-if="props.providerName === 'Github'">
                <img
                    src="https://avatars.githubusercontent.com/u/739984?v=4"
                    alt="Github Logo"
                    class="w-7 aspect-square"
                />
            </template>
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
