<template>
    <div>
        <UModal :model-value="modelValue" @update:model-value="value => emits('update:modelValue', value)">

            <div class="p-4 flex flex-col">
                <h3 class="text-xl font-semibold text-center">{{ title }}</h3>

                <div class="min-h-24 my-4" :class="class">
                    <slot />
                </div>

                <div class="flex gap-x-2 ml-auto flex-1 items-end">
                    <UButton size="lg" color="red" @click="closeModal()">Cancel</UButton>
                    <UButton size="lg" @click="emits('submit'); closeModal()">{{ submitButtonText }}</UButton>
                </div>
            </div>
        </UModal>
    </div>
</template>

<script lang="ts" setup>
type Props = {
    modelValue: boolean;
    title: string;
    submitButtonText?: string;
    class?: string;
}
const props = withDefaults(defineProps<Props>(), {
    submitButtonText: "Submit",
    class: ""
})
const emits = defineEmits(['update:modelValue', 'submit'])

const closeModal = () => {
    emits('update:modelValue', false)
}
</script>

<style></style>