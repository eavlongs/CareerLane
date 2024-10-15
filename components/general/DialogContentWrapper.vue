<template>
    <div class="p-4 flex flex-col">
        <template v-if="!titleOnly">
            <h3 class="text-xl font-semibold text-center">{{ title }}</h3>

            <div class="min-h-24 my-4" :class="class">
                <slot />
            </div>
        </template>

        <template v-else>
            <h3 class="text-xl font-semibold text-center mt-2 mb-10">{{ title }}</h3>
        </template>

        <div :class="!titleOnly ? 'flex gap-x-2 ml-auto flex-1 items-end' : 'flex gap-x-2 justify-center'">
            <UButton size="lg" color="red" @click="emits('cancel')">Cancel</UButton>
            <UButton size="lg" :type="isFormSubmitButton ? 'submit' : 'button'" @click="emits('submit');">
                {{ submitButtonText }}
            </UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
type Props = {
    title: string;
    submitButtonText?: string;
    isFormSubmitButton?: boolean;
    titleOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    submitButtonText: "Submit",
    isFormSubmitButton: false,
    titleOnly: false
})

const emits = defineEmits(['cancel', 'submit'])
</script>

<style></style>