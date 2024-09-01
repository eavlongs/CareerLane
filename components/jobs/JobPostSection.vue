<template>
    <PostSection :class="props.class" :title="title" link-for-see-all-btn="/jobs?sort=latest">
        <!-- TODO: add fallback when there's no data -->
        <JobPostCard v-for="j in jobs" :job="j" :key="j.id" />
    </PostSection>
</template>

<script lang="ts" setup>
import type { JobPost } from '~/utils/types';

type Props = {
    jobs: JobPost[],
    title: string;
    class?: string;
    seeAllJobLink?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
    class: "",
    seeAllJobLink: null
})

</script>

<style></style>