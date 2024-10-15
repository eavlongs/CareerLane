<template>
    <UModal :model-value="modelValue" @update:model-value="value => emits('update:modelValue', value)">
        <template v-if="withWrapper">
            <DialogContentWrapper :title="title" :titleOnly="titleOnly" :submitButtonText="submitButtonText"
              :isFormSubmitButton="isFormSubmitButton" @cancel="closeModal()" @submit="emits('submit')">
                <slot />
            </DialogContentWrapper>
        </template>

        <template v-else>
            <slot />
        </template>
    </UModal>
</template>

<script lang="ts" setup>
type Props = {
    modelValue: boolean;
    title?: string;
    submitButtonText?: string;
    class?: string;
    closeOnSubmit?: boolean;
    isFormSubmitButton?: boolean;
    withWrapper?: boolean;
    titleOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    submitButtonText: "Submit",
    class: "",
    closeOnSubmit: true,
    isFormSubmitButton: false,
    title: "",
    withWrapper: true,
    titleOnly: false
})
const emits = defineEmits(['update:modelValue', 'submit'])

const closeModal = () => {
    emits('update:modelValue', false)
}
</script>

<style></style>