<template>
    <div class="border mb-1 border-gray-200 flex rounded items-center p-1 md:p-2 gap-x-2 hover:bg-gray-50">
        <img :src="prefixStorageUrl(userApplication.user.avatar_url) ?? USER_AVATAR_FALLBACK"
          class="rounded border shadow-sm h-24 w-32 max-h-24 max-w-32 md:h-24 md:w-40 md:max-h-24 md:max-w-40 object-contain mr-2 md:mr-4 lg:mr-6" />

        <div class="flex-grow flex items-center">
            <div class="flex-grow">
                <p class="block text-lg font-semibold line-clamp-1 leading-none md:leading-normal">
                    {{ userApplication.user.first_name }} {{ userApplication.user.last_name }}
                </p>
                <div class="flex flex-col gap-y-1 text-xs md:text-sm mt-1 leading-none md:leading-normal">
                    <p class="leading-4 md:leading-normal">
                        {{ formatJobPostDate(userApplication.created_at) }}
                    </p>
                    <p class="leading-4 md:leading-normal">
                        {{ applicantJobDetail.join(" | ") }}
                    </p>
                </div>
            </div>

        </div>
        <div class="flex gap-x-2 mr-2">
            <UTooltip text="Download CV" :popper="{ placement: 'top' }">
                <UButton icon="ic:baseline-download" @click="downloadCV" />
            </UTooltip>

            <template v-if="userApplication.is_active">
                <UTooltip text="Mark as reviewed" :popper="{ placement: 'top' }">
                    <UButton icon="ic:sharp-mark-email-read" @click="markAsReviewed" />
                </UTooltip>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type UserApplication } from '~/utils/types';

type Props = {
    userApplication: UserApplication
}

const props = defineProps<Props>()
const emits = defineEmits(["refetch", "error"])

const applicantJobDetail: string[] = []
if (props.userApplication.user.job_title) {
    applicantJobDetail.push(props.userApplication.user.job_title)
}
if (props.userApplication.user.job_level) {
    applicantJobDetail.push(props.userApplication.user.job_level)
}

const { $api } = useNuxtApp();

async function downloadCV() {
    const responseBlob = await $api<Blob>(`/applications/${props.userApplication.id}/download`)

    if (ACCEPTED_CV_TYPES.includes(responseBlob.type) === false) {
        emits("error", "Couldn't download CV. Please try again later.")
        return
    }
    const url = window.URL.createObjectURL(responseBlob);
    const a = document.createElement('a');
    a.href = url;
    const fileType = responseBlob.type
    a.download = `${props.userApplication.user.first_name}_${props.userApplication.user.last_name}_CV.${getFileExtensionByFileType(fileType)}`;
    document.body.appendChild(a);
    a.click(); // Trigger the download
    a.remove(); // Clean up
    window.URL.revokeObjectURL(url); // Revoke the object URL
    emits('refetch');
}

async function markAsReviewed() {
    const response = await $api<ApiResponse>(`/applications/${props.userApplication.id}/review`, {
        method: 'POST'
    })

    if (response.success) {
        emits("refetch")
    } else {
        emits("error", response.message)
    }
}
</script>
