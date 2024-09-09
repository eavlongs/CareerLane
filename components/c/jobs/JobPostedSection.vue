<template>
    <Section :class="props.class" :title="type == 'active' ? 'Active Jobs' : 'Inactive Jobs'" :noData="jobs.length == 0"
      :handleNoData="{
        hide: type == 'inactive',
        text: type == 'active' ? 'No jobs posted' : ''
    }">
        <template #buttons v-if="type == 'active'">
            <UButton to="/c/jobs/create">Create New Job</UButton>
        </template>

        <JobPostedCard v-for="j in jobs" :job="j" :key="j.id" :type="type" />

    </Section>
</template>

<script lang="ts" setup>
type Props = {
    jobs: JobPost[],
    class?: string;
    type: "active" | "inactive"
}

const props = withDefaults(defineProps<Props>(), {
    class: "",
})


</script>

<style></style>