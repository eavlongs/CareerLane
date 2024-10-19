<template>
    <div class="mt-4 flex justify-between items-center">
        <button
            @click="$emit('prev-page')"
            :disabled="currentPage === 1"
            class="px-4 py-2 border border-gray-300 rounded-lg"
        >
            Previous
        </button>
        <span>Page {{ currentPage }}</span>
        <button
            @click="$emit('next-page')"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 border border-gray-300 rounded-lg"
        >
            Next
        </button>
    </div>
</template>

<script setup lang="ts">
// Props to control pagination
const props = defineProps<{
    currentPage: number;
    totalPages: number;
}>();

// Emit events to the parent component to navigate between pages
</script>

<style scoped></style>
