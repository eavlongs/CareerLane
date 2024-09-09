<template>
    <PageWrapper>
        <JobPostedSection class="my-6" :jobs="activeJobs" type="active" />
        <JobPostedSection class="my-6" :jobs="inactiveJobs" type="inactive" />
    </PageWrapper>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "company-layout"
})

const activeJobs = ref<JobPost[]>([])
const inactiveJobs = ref<JobPost[]>([])

const user = useUser()
const toast = useToast()

const { data: activeJobResponse, refresh: refreshActiveJobs, status } = await useAPI<ApiResponse<{
    jobs: JobPost[]
}>>(`/companies/${user.value!.id}/jobs`)

if (activeJobResponse.value.success) {
    activeJobs.value = activeJobResponse.value.data!.jobs
    activeJobs.value = activeJobs.value.map(job => {
        return {
            ...job,
            created_at: new Date(job.created_at),
            updated_at: new Date(job.updated_at)
        }
    })
} else {
    toastErrorMessage(toast, activeJobResponse.value.message)
}

const { data: inactiveJobResponse, refresh: refreshInactiveJobs } = await useAPI<ApiResponse<{
    jobs: JobPost[]
}>>(`/companies/${user.value!.id}/jobs?is_active=false`)

if (inactiveJobResponse.value.success) {
    inactiveJobs.value = inactiveJobResponse.value.data!.jobs
    inactiveJobs.value = inactiveJobs.value.map(job => {
        return {
            ...job,
            created_at: new Date(job.created_at),
            updated_at: new Date(job.updated_at)
        }
    })

} else {
    toastErrorMessage(toast, inactiveJobResponse.value.message)
}

</script>

<style></style>