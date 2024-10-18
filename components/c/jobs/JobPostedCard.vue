<template>
    <NuxtLink :to="`/jobs/${props.job.id}`"
      class="border mb-1 border-gray-200 flex rounded items-center p-1 md:p-2 gap-x-2 hover:bg-gray-50">

        <img :src="prefixStorageUrl(job.logo_url) ?? COMPANY_LOGO_FALLBACK"
          class="rounded border shadow-sm h-24 w-32 max-h-24 max-w-32 md:h-24 md:w-40 md:max-h-24 md:max-w-40 object-contain mr-2 md:mr-4 lg:mr-6" />

        <div class="flex-grow flex items-center">
            <div class="flex-grow">
                <p class="block text-lg font-semibold line-clamp-1 leading-none md:leading-normal">
                    {{ props.job.title }}
                </p>
                <div class="flex flex-col gap-y-1 text-xs md:text-sm mt-1 leading-none md:leading-normal">
                    <p class="line-clamp-1">
                        <template v-if="props.job.location == JobLocationEnum.Remote">
                            Remote
                        </template>
                        <template v-else>
                            {{ props.job.company_location }}
                            <span v-if="[JobLocationEnum.Onsite, JobLocationEnum.Hybrid].includes(props.job.location)">
                                {{ JobLocationEnumToStringMap[props.job.location] }}
                            </span>
                        </template>
                    </p>
                    <p class="leading-4 md:leading-normal">
                        <span class="border-r pr-1 md:pr-2 border-black"
                          v-if="Object.keys(JobTypeEnumToStringMap).includes(props.job.type.toString())">{{
                            JobTypeEnumToStringMap[props.job.type] }}
                        </span>
                        <span class="pl-1 md:pl-2 border-r pr-1 md:pr-2 border-black">
                            {{ formatJobPostDate(props.job.created_at) }}
                        </span>
                        <span class="pl-1 md:pl-2">
                            {{ props.job.applicants }} application{{ props.job.applicants > 1 ? 's' : '' }}
                        </span>

                    </p>
                </div>
            </div>
            <div class="flex gap-x-2 mr-2">
                <UTooltip text="View job applications" :popper="{ placement: 'top' }">
                    <UButton icon="ic:twotone-people-alt" :to="`/c/jobs/${props.job.id}/applications`" />
                </UTooltip>
                <template v-if="type == 'active'">
                    <UTooltip text="Edit Job">
                        <UButton icon="ic:outline-mode-edit" :to="`/c/jobs/${props.job.id}`" />
                    </UTooltip>
                </template>
            </div>
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