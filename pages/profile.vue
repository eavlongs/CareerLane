<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <UCard class="w-full sm:w-[370px] md:w-[600px] p-8 shadow-lg bg-white">
            <h1 class="font-bold text-2xl text-center mb-8">
                Profile Information
            </h1>

            <!-- Profile Picture -->
            <div class="flex flex-col items-center mb-8">
                <UAvatar :src="profilePictureUrl ? profilePictureUrl : USER_AVATAR_FALLBACK" alt="profile picture"
                  size="3xl" class="object-cover mb-4 border border-gray-300 rounded-full" />
                <button class="text-sm text-blue-500 hover:underline" @click="openFileDialog">
                    Change Profile Picture
                </button>
                <input type="file" ref="fileInput" @change="onFileChange" class="hidden" name="profile" />
            </div>

            <!-- Profile Information Display -->
            <UForm ref="form" :state="state" :schema="schema" @submit.prevent="updateProfile" class="grid gap-4"
              method="post">
                <!-- First Name -->
                <UFormGroup label="First Name" name="first_name">
                    <UInput v-model="state.first_name" :readonly="!editing" placeholder="First Name" />
                </UFormGroup>

                <!-- Last Name -->
                <UFormGroup label="Last Name" name="last_name">
                    <UInput v-model="state.last_name" :readonly="!editing" placeholder="Last Name" />
                </UFormGroup>

                <!-- Email (always read-only) -->
                <UFormGroup label="Email" name="email">
                    <UInput type="email" v-model="state.email" readonly placeholder="Email" />
                </UFormGroup>

                <UFormGroup label="Job Title" name="job_title">
                    <UInput v-model="state.job_title" :readonly="!editing" placeholder="Job Title" />
                </UFormGroup>

                <UFormGroup label="Job Level" name="job_level">
                    <UInput v-model="state.job_level" :readonly="!editing" placeholder="Job Level" />
                </UFormGroup>

                <UButton v-if="!editing" class="w-32 mt-4 py-1 text-xs flex justify-center items-center h-8"
                  color="primary" @click="toggleEdit">
                    Edit Profile
                </UButton>

                <div v-else class="flex justify-between mt-4">
                    <UButton class="w-32 py-1 text-xs flex justify-center items-center h-8" color="primary"
                      type="submit">
                        Save
                    </UButton>
                    <UButton class="w-28 py-1 text-xs flex justify-center items-center h-8" variant="outline"
                      @click="toggleEdit">
                        Cancel
                    </UButton>
                </div>

                <UButton type="button" class="w-32 mt-4 py-1 text-xs flex justify-center items-center h-8"
                  variant="outline" @click="changePassword">
                    Change Password
                </UButton>
            </UForm>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

import { z } from "zod"
import type { Form } from "#ui/types";

definePageMeta({
    layout: "main-navbar"
})
// State
const state = reactive<{
    first_name: string;
    last_name: string;
    email: string;
    job_title: string;
    job_level: string;
}>({
    first_name: "",
    last_name: "",
    email: "",
    job_title: "",
    job_level: "",
});

const schema = z.object({
    first_name: z.string().min(1, { message: "First name is required" }).max(30, { message: "First name is too long" }),
    last_name: z.string().min(1, { message: "Last name is required" }).max(30, { message: "Last name is too long" }),
    email: z.string().email({ message: "Invalid email address" }),
    job_title: z.string().max(50, { message: "Job title is too long" }).nullable(),
    job_level: z.string().max(50, { message: "Job level is too long" }).nullable(),
})

type Schema = z.infer<typeof schema>;
const form = ref<Form<Schema>>()

// Flags and refs
const headers = useRequestHeaders(["cookie"])
const editing = ref(false);
const fileInput = ref();
const selectedFile = ref();
const profilePictureUrl = ref(""); // Reactive profile picture URL
const { $api } = useNuxtApp();
const toast = useToast()

// Toggle editing mode
function toggleEdit() {
    editing.value = !editing.value;
}

const { data: profileData, refresh } = await useAPI<ApiResponse<{
    first_name: string;
    last_name: string;
    email: string;
    job_title: string;
    job_level: string;
    avatar_url: string;
}>>("/user/profile-information", { headers })

// Update Profile Info
async function updateProfile() {
    try {
        const response = await $api<ApiResponse>(
            "/user/edit-profile",
            {
                method: "POST",
                body: JSON.stringify({
                    first_name: state.first_name,
                    last_name: state.last_name,
                    job_title: state.job_title,
                    job_level: state.job_level,
                }),
            }
        );

        if (response.success) {
            editing.value = false;
            toastSuccessMessage(toast, response.message);
            await refetch();
        } else {
            toastErrorMessage(toast, response.message);
        }
    } catch (error) {
        toastErrorMessage(toast, "An error occurred while updating your profile.");
    }
}

// Change Password
function changePassword() {
    navigateTo("/change-password");
}

// Open file dialog to select new profile picture
function openFileDialog() {
    fileInput.value.click();
}

// Handle profile picture file change
function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        selectedFile.value = target.files[0];
        uploadProfilePicture();
    }
}

// Upload profile picture to the server
async function uploadProfilePicture() {
    if (!selectedFile.value) return;

    const formData = new FormData();
    formData.append("profile", selectedFile.value);

    try {
        const response = await $api<ApiResponse>(
            "/user/upload-profile-picture",
            {
                method: "POST",
                body: formData,
            }
        );

        if (response.success) {
            toastSuccessMessage(toast, response.message);
            await refetch();
        } else {
            toastErrorMessage(toast, response.message);
        }
    } catch (error) {
        toastErrorMessage(toast, "An error occurred while uploading your profile picture.");
    }
}

function runFetchSideEffect() {
    if (profileData.value.success && profileData.value.data) {
        const profile = profileData.value.data;
        state.first_name = profile.first_name;
        state.last_name = profile.last_name;
        state.email = profile.email;
        state.job_title = profile.job_title;
        state.job_level = profile.job_level;
        profilePictureUrl.value = prefixStorageUrl(profile.avatar_url) || "";
    }
}

async function refetch() {
    await refresh();
    runFetchSideEffect();
}
runFetchSideEffect();
</script>

<style></style>
