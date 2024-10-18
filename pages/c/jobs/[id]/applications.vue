<template>
    <PageWrapper>
        <Section :title="title" :noData="activeApplications.length == 0" class="my-6" :handle-no-data="{
            hide: false,
            text: 'No applications yet'
        }">
            <template v-for="a in activeApplications" :key="1">
                <ApplicationCard :userApplication="a" @refetch="refetch"
                  @error="message => toastErrorMessage(toast, message)" />
            </template>
        </Section>

        <Section title="Reviewed Applications" :noData="reviewedApplications.length == 0" :handle-no-data="{
            hide: true,
        }">
            <template v-for="a in reviewedApplications" :key="2">
                <ApplicationCard :userApplication="a" @error="message => toastErrorMessage(toast, message)" />
            </template>
        </Section>
    </PageWrapper>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "company-layout"
})

const title = ref<string>("")

const headers = useRequestHeaders(['cookie'])
const route = useRoute();
const toast = useToast()
// created 2 activeApplications and reviewedApplications variables two times, because the ones from API response is not reactive
const activeApplications = ref<UserApplication[]>([])
const reviewedApplications = ref<UserApplication[]>([])

const { data: _activeApplications, refresh: refreshActiveApplications } = await useAPI<ApiResponse<{ applications: UserApplication[], job: Pick<PartialJobPost, "id" | "title"> }>>(`/jobs/${route.params.id}/applications?is_active=${true}`, {
    headers
})

const { data: _reviewedApplications, refresh: refreshReviewedApplications } = await useAPI<ApiResponse<{ applications: UserApplication[], job: Pick<PartialJobPost, "id" | "title"> }>>(`/jobs/${route.params.id}/applications?is_active=${false}`, {
    headers
})

async function runFetchSideEffects() {
    if (!_activeApplications.value.success) {
        toastErrorMessage(toast, _activeApplications.value.message);
        return
    }
    if (!_reviewedApplications.value.success) {
        toastErrorMessage(toast, _reviewedApplications.value.message);
        return
    }

    for (const application of _activeApplications.value.data?.applications!) {
        application.created_at = new Date(application.created_at)
        application.updated_at = new Date(application.updated_at)
    }

    for (const application of _reviewedApplications.value.data?.applications!) {
        application.created_at = new Date(application.created_at)
        application.updated_at = new Date(application.updated_at)
    }

    title.value = `Applications for "${_activeApplications.value.data?.job.title!}"`

    activeApplications.value = _activeApplications.value.data?.applications!
    reviewedApplications.value = _reviewedApplications.value.data?.applications!
}

async function refetch() {
    await refreshActiveApplications()
    await refreshReviewedApplications()

    runFetchSideEffects()
}

runFetchSideEffects()

</script>
