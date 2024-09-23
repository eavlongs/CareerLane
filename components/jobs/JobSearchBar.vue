<template>
    <UForm :state="{}" @submit="(_: any) => {
        emits('submit');
        navigateTo(queryBuilder('/jobs', { q: props.modelValue }))
    }" :class="class">

        <UInput icon="i-heroicons-magnifying-glass-20-solid" size="lg" color="white" :trailing="false"
          placeholder="Search..." :autofocus="true" :model-modifiers="{ trim: true }" :modelValue="props.modelValue"
          @update:model-value="value => emits('update:modelValue', value)" />

        <button type="submit" class="hidden"></button>
    </UForm>
</template>

<script lang="ts" setup>
type Props = {
    modelValue: string;
    class?: string;
}

const props = defineProps<Props>()
const emits = defineEmits(["update:modelValue", "submit"])
</script>

<style></style>