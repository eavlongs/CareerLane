<template>
    <div class="border-2 border-gray-200 flex rounded items-center p-2">
        <NuxtLink :to="jobLink" class="peer">
            <img :src="props.job.logo" class="rounded border shadow-sm h-24 w-40 object-cover mr-6" />
        </NuxtLink>
        <!-- TODO: add UI for save job -->
        <div class="flex-grow peer">
            <ULink :to="jobLink" class="block text-lg font-semibold line-clamp-1">
                {{ props.job.title }}
            </ULink>
            <div class="flex flex-col gap-y-1 text-sm mt-1">
                <ULink :to="`/companies/{job.company_id}`" class="inline-block">{{ props.job.company_name }}
                </ULink>
                <p>
                    <template v-if="props.job.location == JobLocationEnum.Remote">
                        Remote
                    </template>
                    <template v-else>
                        {{ props.job.company_location }}
                        <span class="ml-1"
                          v-if="[JobLocationEnum.Onsite, JobLocationEnum.Hybrid].includes(props.job.location)">
                            ({{ JobLocationEnum[props.job.location] }})
                        </span>
                    </template>
                </p>
                <p>Salary:{{ " " }}
                    <template v-if="props.job.salary">
                        <template v-if="typeof props.job.salary == 'number'">
                            {{ formatToCurrency(props.job.salary) }}
                        </template>
                        <template v-else>
                            {{ formatToCurrency(props.job.salary[0]) }} to {{ formatToCurrency(props.job.salary[1]) }}
                        </template>

                        <template v-if="props.job.is_salary_negotiable">
                            (Negotiable)
                        </template>
                    </template>
                    <template v-else>
                        Negotiable
                    </template>

                </p>
            </div>
        </div>

        <UButton :to="jobLink" variant="link" class="hidden peer-hover:inline-flex hover:inline-flex">See More</UButton>
    </div>
</template>

<script lang="ts" setup>
type Props = {
    job: JobPost
}

const props = defineProps<Props>()
const jobLink = `/jobs/{props.job.id}`
</script>

<style></style>