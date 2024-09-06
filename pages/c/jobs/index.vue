<template>
    <PageWrapper>
        <JobPostedSection class="my-6" :jobs="recentJobs" />
    </PageWrapper>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "company-layout"
})

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