<template>
    <NuxtLink :to="`/jobs/${props.job.id}`"
      class="border mb-1 border-gray-200 flex rounded items-center p-1 md:p-2 gap-x-2 hover:bg-gray-50">

        <img :src="props.job.logo ?? COMPANY_LOGO_FALLBACK"
          class="rounded border shadow-sm h-24 w-32 max-h-24 max-w-32 md:h-24 md:w-40 md:max-h-24 md:max-w-40 object-contain mr-2 md:mr-4 lg:mr-6" />

        <div class="flex-grow flex items-center">
            <div class="flex-grow">
                <p class="block text-lg font-semibold line-clamp-1 leading-none md:leading-normal">
                    {{ props.job.title }}
                </p>
                <div class="flex flex-col gap-y-1 text-xs md:text-sm mt-1 leading-none md:leading-normal">
                    <p class="inline-block line-clamp-1">
                        {{ props.job.company_name }}
                    </p>
                    <p class="line-clamp-1">
                        <template v-if="props.job.location == JobLocationEnum.Remote">
                            Remote
                        </template>
                        <template v-else>
                            {{ props.job.company_location }}
                            <span class="ml-1"
                              v-if="[JobLocationEnum.Onsite, JobLocationEnum.Hybrid].includes(props.job.location)">
                                {{ JobLocationEnumToStringMap[props.job.location] }}
                            </span>
                        </template>
                    </p>
                    <p class="leading-4 md:leading-normal">
                        <span class="border-r pr-1 md:pr-2 border-black"
                          v-if="Object.keys(JobTypeEnumToStringMap).includes(props.job.type.toString())">{{
                            JobTypeEnumToStringMap[props.job.type] }}
                        </span>
                        <span class="border-r px-1 md:px-2 border-black">
                            <template v-if="props.job.salary">
                                <template v-if="typeof props.job.salary == 'number'">
                                    {{ formatToCurrency(props.job.salary) }}
                                </template>
                                <template v-else>
                                    {{ formatToCurrency(props.job.salary[0]) }} to {{
                                        formatToCurrency(props.job.salary[1])
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
                    </p>
                </div>
            </div>
            <template v-if="type == 'active'">
                <UTooltip text="Edit Job" :popper="{ placement: 'top' }">
                    <UButton icon="ic:outline-mode-edit" class="mr-2" :to="`/c/jobs/${props.job.id}`" />
                </UTooltip>
            </template>
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
type Props = {
    job: JobPost,
    type?: "active" | "inactive"
}

const props = withDefaults(defineProps<Props>(), {
    type: "active"
})

</script>

<style></style>