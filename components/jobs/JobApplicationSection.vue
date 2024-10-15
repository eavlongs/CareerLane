<template>
    <div class="flex flex-col items-center">
        <UAvatar :src="job.logo_url ? prefixStorageUrl(job.logo_url)! : COMPANY_LOGO_FALLBACK" size="3xl"
          img-class="object-contain" class="border" />
        <p class="text-base md:text-lg font-semibold mt-4">
            {{ job.company_name }}
        </p>
        <p class="text-sm md:text-base">
            {{ job.company_location }}
        </p>

        <template v-if="new Date().getTime() > (job.extended_deadline?.getTime() ?? 0)">
            <UTooltip text="Application closed">
                <UButton class="mt-6" size="lg" disabled>
                    Apply Now
                </UButton>
            </UTooltip>
        </template>

        <template v-else>
            <UButton class="mt-6" size="lg" @click="guardAction(() => isOpen = true)">
                Apply Now
            </UButton>
        </template>

    </div>

    <JobApplicationDialog v-model="isOpen" :job="job" />
</template>

<script lang="ts" setup>
type Props = {
    job: JobPost & { applied: boolean };
}

const props = defineProps<Props>();
const isOpen = ref(false)
const { guardAction } = useGuard()

</script>

<style></style>