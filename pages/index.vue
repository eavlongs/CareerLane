<template>
    <Section class="my-6" title="" :no-data="false">
        <p class="text-xl md:text-2xl font-semibold">Search for the job you're looking for ...</p>
        <div class="flex gap-x-4 items-center w-full mt-4">
            <JobSearchBar v-model="query" class="w-full" />
            <JobSearchBarButton :query="query" />
        </div>
    </Section>

    <JobPostSection class="mb-6" title="Recent Jobs" :jobs="recentJobs" see-all-job-link="/jobs?sort=latest" />
    <CompaniesSection title="Featured Companies" :companies="featuredCompanies" />
</template>

<script lang="ts" setup>
import { type ApiResponse, type JobPost } from '~/utils/types';

definePageMeta({
    layout: "main-navbar"
})

const query = ref('')

const recentJobs = ref<JobPost[]>([]);
const { data: recentJobsResponse } = await useAPI<ApiResponse<{ jobs: JobPost[] }>>(queryBuilder('/jobs', { sort: '-created_at', page: 1, limit: 5 }));

if (recentJobsResponse.value.success) {
    recentJobs.value = recentJobsResponse.value.data!.jobs;
    recentJobs.value = recentJobs.value.map(job => {
        return {
            ...job,
            original_deadline: new Date(job.original_deadline),
            extended_deadline: job.extended_deadline ? new Date(job.extended_deadline) : null,
            created_at: new Date(job.created_at),
            updated_at: new Date(job.updated_at)
        }
    })
}

type CompanyWithAggregatedJobData = Company & {
    total_applicants: number;
    total_job_posts: number;
}

const featuredCompanies = ref<
    CompanyWithAggregatedJobData[]>([]);

const { data: featuredCompaniesResponse } = await useAPI<ApiResponse<{ companies: CompanyWithAggregatedJobData[] }>>("/companies/featured")

if (featuredCompaniesResponse.value.success) {
    featuredCompanies.value = featuredCompaniesResponse.value.data!.companies;
}


</script>

<style></style>