<template>
    <Section class="my-6" title="" :no-data="false">
        <p class="text-xl md:text-2xl font-semibold">Search for the job you're looking for ...</p>
        <div class="flex gap-x-4 items-center w-full mt-4">
            <JobSearchBar v-model="searchBarQuery" class="w-full" @submit="updateQuery(searchBarQuery)" />
            <JobSearchBarButton :query="searchBarQuery" @click="updateQuery(searchBarQuery)" />
            <JobSearchOptions v-model="jobSearchOptions" />
        </div>
    </Section>

    <Section class="my-6" :title="resultName" :no-data="jobs.length == 0" :handleNoData="{
        hide: false,
        text: `No job found`
    }" :pagination="jobsPaginationMetaData" @page-change="onPageChange">
        <JobPostCard v-for="j in jobs" :job="j" :key="j.id" />
    </Section>
</template>

<script lang="ts" setup>
import { type PaginationMetaData } from '~/utils/types';

definePageMeta({
    layout: "main-navbar"
})

const url = useRequestURL();

const query = ref<string>(url.searchParams.get("q") ?? '');
const resultName = ref<string>(query.value ? `Search Results for "${query.value}"` : "Results");
const searchBarQuery = ref<string>("");
const page = parseInt(url.searchParams.get("page") ?? '1');
const limit = parseInt(url.searchParams.get("limit") ?? '10');
const jobs = ref<JobPost[]>([])
const jobsPaginationMetaData = ref<PaginationMetaData>({
    current_page: parseInt(url.searchParams.get("page") ?? "1"),
    per_page: parseInt(url.searchParams.get("limit") ?? "10"),
    total: 1,
    last_page: 1,
})
const router = useRouter();

const jobSearchOptions = ref<JobSearchOptions>({
    page,
    limit
});

const fetchJobs = async () => {
    const { data } = await useAPI<ApiResponse<{ jobs: JobPost[], meta: PaginationMetaData }>>('/jobs', {
        query: {
            q: query.value,
            page: jobsPaginationMetaData.value.current_page,
            limit: jobsPaginationMetaData.value.per_page
        }
    })

    if (data.value.success) {
        jobs.value = data.value.data!.jobs;
        jobs.value = jobs.value.map((job) => {
            return {
                ...job,
                original_deadline: new Date(job.original_deadline),
                extended_deadline: job.extended_deadline
                    ? new Date(job.extended_deadline)
                    : null,
                created_at: new Date(job.created_at),
                updated_at: new Date(job.updated_at),
            };
        });
        jobsPaginationMetaData.value = data.value.data?.meta!;
    }
}

await fetchJobs();

watch(query, () => {
    resultName.value = query.value ? `Search Results for "${query.value}"` : "Results";
    jobsPaginationMetaData.value.current_page = 1;
    fetchJobs()
})

const updateQuery = (_query: string) => {
    query.value = _query;
}

const onPageChange = (page: number) => {
    jobsPaginationMetaData.value.current_page = page;
    router.replace({
        query: {
            q: query.value,
            page: page,
            limit: jobsPaginationMetaData.value.per_page
        }
    })
    fetchJobs();
}
</script>

<style></style>