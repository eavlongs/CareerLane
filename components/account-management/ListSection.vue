<template>
    <div class="w-full">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4" :id="id">
            {{ title }}
        </h2>
        <slot />
    </div>
</template>

<script lang="ts" setup>
type Props = {
    title: string;
    id: string;
}
const props = defineProps<Props>()
</script>
