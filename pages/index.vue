<template>
    <div class="my-6 section w-full">
        <p class="text-2xl font-semibold">Search for the job you're looking for</p>
        <div class="flex gap-x-4 items-center w-full mt-4   ">
            <JobSearchBar v-model="query" class="w-full" />
            <JobSearchBarButton :query="query" />
        </div>
    </div>

    <JobPostSection title="Recent Jobs" :jobs="recentJobs" />
</template>

<script lang="ts" setup>
import { JobLocationEnum, JobTypeEnum, type JobPost } from '~/utils/types';

definePageMeta({
    layout: "main-navbar"
})

const query = ref('')
const recentJobs: JobPost[] = [
    {
        id: "1",
        title: "Software Engineer",
        company_id: "1",
        company_name: "Google",
        logo: "https://cdn2.hubspot.net/hubfs/53/image8-2.jpg",
        type: JobTypeEnum.FullTime,
        location: JobLocationEnum.Onsite,
        salary: [100000, 150000],
        is_salary_negotiable: false,
        company_location: "Mountain View, CA",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc.",
        created_at: new Date()
    },
    {
        id: "2",
        title: "Product Manager",
        company_id: "2",
        company_name: "Facebook",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.png/2560px-Meta-Logo.png",
        type: JobTypeEnum.PartTime,
        location: JobLocationEnum.Hybrid,
        salary: 120000,
        company_location: "Menlo Park, CA",
        is_salary_negotiable: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc.",
        created_at: new Date()
    },
    {
        id: "3",
        title: "Data Scientist",
        company_id: "3",
        company_name: "Amazon",
        logo: "https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg",
        type: JobTypeEnum.Internship,
        location: JobLocationEnum.Remote,
        salary: null,
        company_location: "Seattle, WA",
        is_salary_negotiable: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc.",
        created_at: new Date()
    }
]
</script>

<style></style>