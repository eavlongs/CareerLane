<template>
    <div class="section">
        <p class="text-xl font-semibold mb-4">{{ title }}</p>
        <div>
            <JobPostCard v-for="j in jobs" :job="j" :key="j.id" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { JobPost } from '~/utils/types';

type Props = {
    jobs: JobPost[],
    title: string;
}

const props = defineProps<Props>()
</script>

<style></style>