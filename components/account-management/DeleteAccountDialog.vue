<template>
    <Dialog title="Delete Account" :modelValue="modelValue"
      @update:model-value="value => emits('update:modelValue', value)" submitButtonText="Delete Account"
      @submit="deleteAccount">
        <p class="mb-4">Are you sure you want to delete your account? This action cannot be undone</p>
    </Dialog>
</template>

<script lang="ts" setup>
type Props = {
    modelValue: boolean
}

const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue', 'success', 'error']);

const { $api } = useNuxtApp()

async function deleteAccount() {
    const response = await $api<ApiResponse>("/auth/delete-account", {
        method: "POST"
    })

    if (response.success) {
        emits('success', response.message)
        window.location.href = '/'
    } else {
        emits('error', response.message)
    }
}
</script>
