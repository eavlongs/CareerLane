<template>
    <Section class="my-6" title="" :no-data="false">
        <p class="text-xl md:text-2xl font-semibold">Search for the job you're looking for ...</p>
        <div class="flex gap-x-4 items-center w-full mt-4">
            <JobSearchBar v-model="searchBarQuery" class="w-full" @submit="updateQuery(searchBarQuery)" />
            <JobSearchBarButton :query="searchBarQuery" @click="updateQuery(searchBarQuery)" />
            <JobSearchOptions v-model="jobSearchOptions" />
        </div>
    </Section>

    <Section class="my-6" :title="resultName" :no-data="false" :handleNoData="{
        hide: false,
        text: `No job found`
    }">

    </Section>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "main-navbar"
})

const url = useRequestURL();

const query = ref<string>(url.searchParams.get("q") ?? '');
const resultName = ref<string>(query.value ? `Search Results for "${query.value}"` : "Results");
const searchBarQuery = ref<string>("");
const page = parseInt(url.searchParams.get("page") ?? '1');
const limit = parseInt(url.searchParams.get("limit") ?? '10');

const jobSearchOptions = ref<JobSearchOptions>({
    page,
    limit
});

const fetchJobs = async () => {
    const { data } = await useAPI<ApiResponse<{ jobs: JobPost[] }>>('/jobs', {
        query: {
            q: query.value
        }
    })
}

await fetchJobs();

watch(query, () => {
    resultName.value = query.value ? `Search Results for "${query.value}"` : "Results";
    fetchJobs()
})

const updateQuery = (_query: string) => {
    query.value = _query;
}

</script>

<style></style>