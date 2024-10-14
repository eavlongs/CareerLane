<template>
    <div class="section">
        <h1 class="text-2xl font-semibold mb-4">{{ job.title }}</h1>
        <!-- Salary section -->
        <p class="text-lg md:text-xl">
            <template v-if="job.salary || (job.salary_start_range && job.salary_end_range)">
                <template v-if="job.salary">{{ formatToCurrency(job.salary) }}</template>
                <template v-else-if="job.salary_start_range && job.salary_end_range">
                    {{ formatToCurrency(job.salary_start_range) }}
                    to
                    {{ formatToCurrency(job.salary_end_range) }}
                </template>
                <template v-if="job.is_salary_negotiable">
                    {{ " " }}(Negotiable)
                </template>
            </template>

            <template v-else>
                Negotiable
            </template>
        </p>

        <div class="flex items-center gap-x-2 md:gap-x-4 mt-4 text-base md:text-lg">
            <div class="flex items-center gap-x-2 job-metadata">
                <UIcon name="ic:outline-people-alt" />
                <p>{{ job.applicants }}</p>
            </div>

            <div class="job-metadata">
                {{ formatDate(job.created_at) }}
            </div>

            <div class="flex items-center gap-x-2 job-metadata">
                <UIcon name="ic:baseline-calendar-month" />
                <p> {{ formatDate(job.extended_deadline!) }} </p>
            </div>
        </div>

        <!-- Job Information -->
        <div class="my-6">
            <p class="text-base md:text-lg">Job Information</p>
            <ul class="list-inside list-disc leading-loose">
                <li v-for="ji of jobInformation" :key="ji.label">
                    <span class="font-semibold">{{ ji.label }}:</span> {{ ji.value }}
                </li>
            </ul>
        </div>

        <div>
            <p class="text-base md:text-lg">Job Description</p>
            <p class="mt-2">{{ job.description }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
type Props = {
    job: JobPost;
}
const props = defineProps<Props>();

const jobInformation: { label: string, value: string }[] = [
    {
        label: "Type",
        value: JobTypeEnumToStringMap[props.job.type]
    },
    {
        label: "Work location",
        value: props.job.location == JobLocationEnum.Remote ? JobLocationEnumToStringMap[JobLocationEnum.Remote] : (
            props.job.location! < JobLocationEnum._LENGTH ? JobLocationEnumToStringMap[props.job.location!] + ` (${props.job.company_location})` : "N/A"
        )
    },
    {
        label: "Job Category",
        value: props.job.category_name!
    }
]
</script>
