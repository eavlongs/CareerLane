<template>
    <div class="border mb-1 border-gray-200 flex rounded items-center p-1 md:p-2 gap-x-2 hover:bg-gray-50">
        <NuxtLink :to="jobLink" class="peer">
            <img :src="prefixStorageUrl(props.job.logo_url) ?? COMPANY_LOGO_FALLBACK"
              class="rounded border shadow-sm h-24 w-32 max-h-24 max-w-32 md:h-24 md:w-40 md:max-h-24 md:max-w-40 object-contain mr-2 md:mr-4 lg:mr-6" />
        </NuxtLink>
        <!-- TODO: add UI for save job -->
        <div class="flex-grow peer">
            <ULink :to="jobLink" class="block text-lg font-semibold line-clamp-1 leading-none md:leading-normal">
                {{ props.job.title }}
            </ULink>
            <div class="flex flex-col gap-y-1 text-xs md:text-sm mt-1 leading-none md:leading-normal">
                <ULink :to="`/companies/{job.company_id}`" class="inline line-clamp-1 mr-auto">
                    {{ props.job.company_name }}
                </ULink>
                <p class="line-clamp-1">
                    <span class="border-r pr-1 md:pr-2 border-black">
                        <template v-if="props.job.location == JobLocationEnum.Remote">
                            Remote
                        </template>
                        <template v-else>
                            <span v-if="[JobLocationEnum.Onsite, JobLocationEnum.Hybrid].includes(props.job.location)">
                                {{ JobLocationEnumToStringMap[props.job.location] }}
                                ({{ props.job.company_location }})
                            </span>
                        </template>
                    </span>

                    <span class="border-r px-1 md:px-2 border-black"
                      v-if="Object.keys(JobTypeEnumToStringMap).includes(props.job.type.toString())">{{
                        JobTypeEnumToStringMap[props.job.type] }}
                    </span>

                    <span class="pl-1 md:pl-2">{{ formatJobPostDate(props.job.created_at) }}</span>

                </p>
                <!-- <p class="leading-4 md:leading-normal">
                    <span class="border-r pr-1 md:pr-2 border-black"
                      v-if="Object.keys(JobTypeEnumToStringMap).includes(props.job.type.toString())">{{
                        JobTypeEnumToStringMap[props.job.type] }}
                    </span>
                    <span class="border-r px-1 md:px-2 border-black">
                        <template
                          v-if="props.job.salary || (props.job.salary_start_range && props.job.salary_end_range)">
                            <template v-if="props.job.salary">
                                {{ formatToCurrency(props.job.salary) }}
                            </template>
                            <template v-else-if="props.job.salary_start_range && props.job.salary_end_range">
                                {{
                                    formatToCurrency(props.job.salary_start_range) }} to {{
                                    formatToCurrency(props.job.salary_end_range)
                                }}
                            </template>

                            <template v-if="props.job.is_salary_negotiable">
                                (Negotiable)
                            </template>
                        </template>
                        <template v-else>
                            Negotiable
                        </template>
                    </span>

                    <span class="px-1 md:px-2">{{ formatJobPostDate(props.job.created_at) }}</span>
                </p> -->
            </div>
        </div>

        <UButton :to="jobLink" variant="link" class="hidden md:peer-hover:inline-flex hover:inline-flex">See More
        </UButton>
    </div>
</template>

<script lang="ts" setup>
import type { PartialJobPost } from '~/utils/types';

type Props = {
    job: PartialJobPost
}

const props = defineProps<Props>()
const jobLink = `/jobs/${props.job.id}`
</script>

<style></style>