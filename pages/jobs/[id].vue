<template>
    <div class="grid grid-cols-8 items-start justify-center gap-x-2 md:gap-x-4 mt-4 lg:mx-10 md:mx-6 mx-4">
        <div class="col-span-5">
            <JobDescription :job="job.data?.job!" />
            <SimilarJobSection :jobs="[]" />
        </div>
        <div class="section col-span-3">
            <JobApplicationSection :job="job.data?.job!" />
        </div>
    </div>
</template>

<script lang="ts" setup>

definePageMeta({
    layout: "main-navbar"
})

const headers = useRequestHeaders(['cookie'])
const route = useRoute();
const id = route.params.id as string
const toast = useToast();
const { data: job } = await useAPI<ApiResponse<{
    job: JobPost & {
        applied: boolean,
    }
}>>(`/jobs/${id}`, {
    headers
})

if (!job.value.success) {
    toastErrorMessage(toast, job.value.message);
} else {
    job.value.data!.job.created_at = new Date(job.value.data!.job.created_at);
    job.value.data!.job.extended_deadline = new Date(job.value.data!.job.extended_deadline!);
}

</script>

<style scoped>
.job-metadata {
    @apply border-gray-400 md:py-1 px-1 md:px-2 border rounded;
}
</style>