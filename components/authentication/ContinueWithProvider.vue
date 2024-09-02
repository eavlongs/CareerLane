<template>
    <UButton color="white" size="xl" class="text-center">
        <div class="flex justify-center w-full gap-x-2">
            <!-- TODO: put providerLogo here -->
            <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" size="2xs" />
            Continue with {{ providerName }}
        </div>
    </UButton>
</template>

<script lang="ts" setup>
type Props = {
    providerName: string;
    providerLogo: string;
}

const props = defineProps<Props>()
</script>

<style></style>