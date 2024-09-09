<template>
    <div class="my-6 section w-full">
        <p class="text-xl md:text-2xl font-semibold">Search for the job you're looking for ...</p>
        <div class="flex gap-x-4 items-center w-full mt-4">
            <JobSearchBar v-model="query" class="w-full" />
            <JobSearchBarButton :query="query" />
        </div>
    </div>

    <JobPostSection class="mb-6" title="Recent Jobs" :jobs="recentJobs" see-all-job-link="/jobs?sort=latest" />
    <CompaniesSection title="Featured Companies" :companies="featuredCompanies" />
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
        category_id: "1",
        is_active: true,
        original_deadline: new Date("2022-01-15"),
        extended_deadline: null,
        created_at: new Date("2022-01-01")
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
        category_id: "1",
        is_active: true,
        original_deadline: new Date("2022-01-15"),
        extended_deadline: null,
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
        category_id: "1",
        is_active: true,
        original_deadline: new Date("2022-01-15"),
        extended_deadline: null,
        created_at: new Date()
    }
]

const featuredCompanies: Company[] = [
    {
        id: "1",
        name: "Tech Solutions Inc.",
        logo: "https://cdn2.hubspot.net/hubfs/53/image8-2.jpg",
        location: "San Francisco, CA",
        description: "A leading provider of innovative tech solutions for businesses worldwide."
    },
    {
        id: "2",
        name: "Green Energy Corp.",
        logo: "https://cdn2.hubspot.net/hubfs/53/image8-2.jpg",
        location: "Austin, TX",
        description: "Pioneers in renewable energy with a focus on sustainability and innovation."
    },
    {
        id: "3",
        name: "HealthFirst Medical",
        logo: "https://cdn2.hubspot.net/hubfs/53/image8-2.jpg",
        location: "Boston, MA",
        description: "Providing top-notch healthcare services and cutting-edge medical research."
    },
    {
        id: "4",
        name: "EduNation",
        logo: "https://via.placeholder.com/150?text=EduNation+Logo",
        location: "New York, NY",
        description: "Empowering learners through advanced educational technology and tools."
    },
    {
        id: "5",
        name: "FinServe Solutions",
        logo: "https://via.placeholder.com/150?text=FinServe+Logo",
        location: "Chicago, IL",
        description: "Specializing in financial services and innovative banking technologies."
    },
    {
        id: "6",
        name: "AutoDrive Ltd.",
        logo: "https://via.placeholder.com/150?text=AutoDrive+Logo",
        location: "Detroit, MI",
        description: "Innovators in the automotive industry with a focus on electric and autonomous vehicles."
    },
    {
        id: "7",
        name: "TravelGo",
        logo: "https://via.placeholder.com/150?text=TravelGo+Logo",
        location: "Los Angeles, CA",
        description: "Your trusted partner for planning and booking travel experiences around the globe."
    },
    {
        id: "8",
        name: "FoodieFinds",
        logo: "https://via.placeholder.com/150?text=FoodieFinds+Logo",
        location: "Portland, OR",
        description: "A marketplace for discovering unique and gourmet food products from local artisans."
    },
    {
        id: "9",
        name: "BuildWare",
        logo: "https://via.placeholder.com/150?text=BuildWare+Logo",
        location: "Dallas, TX",
        description: "A leader in construction and building materials, serving clients across the nation."
    },
    {
        id: "10",
        name: "Creative Minds",
        logo: "https://via.placeholder.com/150?text=Creative+Minds+Logo",
        location: "Seattle, WA",
        description: "An advertising agency known for its creative campaigns and innovative marketing strategies."
    },
    {
        id: "11",
        name: "BuildWare",
        logo: "https://via.placeholder.com/150?text=BuildWare+Logo",
        location: "Dallas, TX",
        description: "A leader in construction and building materials, serving clients across the nation."
    },
    {
        id: "12",
        name: "Creative Minds",
        logo: "https://via.placeholder.com/150?text=Creative+Minds+Logo",
        location: "Seattle, WA",
        description: "An advertising agency known for its creative campaigns and innovative marketing strategies."
    }
];
</script>

<style></style>