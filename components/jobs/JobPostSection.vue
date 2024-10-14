<template>
    <Section :class="props.class" :title="title" link-for-see-all-btn="/jobs?sort=latest" :no-data="jobs.length == 0"
      :handle-no-data="{
        hide: false,
        text: 'No jobs available'
    }">
        <!-- TODO: add fallback when there's no data -->
        <JobPostCard v-for="j in jobs" :job="j" :key="j.id" />
    </Section>
</template>

<script lang="ts" setup>
import type { PartialJobPost } from '~/utils/types';

type Props = {
    jobs: PartialJobPost[],
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