<template>
    <Section :class="props.class" title="Jobs Posted">
        <!-- TODO: add fallback when there's no data -->
        <template #buttons>
            <UButton to="/c/jobs/create">Create New Job</UButton>
        </template>
        <JobPostedCard v-for="j in jobs" :job="j" :key="j.id" />
    </Section>
</template>

<script lang="ts" setup>
type Props = {
    jobs: JobPost[],
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    class: "",
})


</script>

<style></style>