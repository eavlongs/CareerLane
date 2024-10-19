<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <UCard class="w-full sm:w-[370px] md:w-[600px] p-8 shadow-lg bg-white">
            <h1 class="font-bold text-2xl text-center mb-8">
                Profile Information
            </h1>

            <!-- Profile Picture -->
            <div class="flex flex-col items-center mb-8">
                <img :src="profilePictureUrl || defaultAvatarUrl" alt=""
                  class="w-24 h-24 rounded-full object-cover mb-4" />
                <button class="text-sm text-blue-500 hover:underline" @click="openFileDialog">
                    Change Profile Picture
                </button>
                <input type="file" ref="fileInput" @change="onFileChange" class="hidden" name="profile" />
            </div>

            <!-- Profile Information Display -->
            <UForm :state="state" :schema="schema" class="grid gap-4">
                <!-- First Name -->
                <UFormGroup label="First Name">
                    <UInput v-model="state.first_name" :readonly="!editing" placeholder="First Name" />
                </UFormGroup>

                <!-- Last Name -->
                <UFormGroup label="Last Name">
                    <UInput v-model="state.last_name" :readonly="!editing" placeholder="Last Name" />
                </UFormGroup>

                <!-- Email (always read-only) -->
                <UFormGroup label="Email">
                    <UInput type="email" v-model="state.email" readonly placeholder="Email" />
                </UFormGroup>

                <UFormGroup label="Job Title">
                    <UInput v-model="state.job_title" :readonly="!editing" placeholder="Job Title" />
                </UFormGroup>

                <UFormGroup label="Job Level">
                    <UInput v-model="state.job_level" :readonly="!editing" placeholder="Job Level" />
                </UFormGroup>

                <UButton v-if="!editing" class="w-32 mt-4 py-1 text-xs flex justify-center items-center h-8"
                  color="primary" @click="toggleEdit">
                    Edit Profile
                </UButton>

                <div v-else class="flex justify-between mt-4">
                    <UButton class="w-32 py-1 text-xs flex justify-center items-center h-8" color="primary"
                      @click="updateProfile">
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
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod"

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

// Flags and refs
const editing = ref(false);
const fileInput = ref();
const selectedFile = ref();
const profilePictureUrl = ref(""); // Reactive profile picture URL
const defaultAvatarUrl = "https://via.placeholder.com/150"; // Fallback placeholder image
const router = useRouter();

// Toggle editing mode
function toggleEdit() {
    editing.value = !editing.value;
}

// Update Profile Info
async function updateProfile() {
    try {
        const response = await $fetch<ApiResponse>(
            "http://localhost:8000/api/upload-profile",
            {
                method: "POST",
                body: JSON.stringify({
                    first_name: state.first_name,
                    last_name: state.last_name,
                    job_title: state.job_title,
                    job_level: state.job_level,
                }),
                credentials: "include",
            }
        );

        if (response.success) {
            alert("Profile updated successfully");
        } else {
            alert(response.message || "Failed to update profile");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while updating your profile.");
    }
}

// Change Password
function changePassword() {
    router.push("/change-password");
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
        const response = await $fetch<ApiResponse>(
            "http://localhost:8000/api/upload-profile-picture",
            {
                method: "POST",
                body: formData,
                credentials: "include",
            }
        );

        if (response.success) {
            alert("Profile picture updated successfully");
        } else {
            alert(response.message || "Failed to upload profile picture");
        }
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("An error occurred while uploading your profile picture.");
    }
}

// Fetch user profile information on page load
async function profileInformation() {
    try {
        const response = await $fetch<ApiResponse>(
            "http://localhost:8000/api/user-profile-information",
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (response.success) {
            state.first_name = response.data.first_name;
            state.last_name = response.data.last_name;
            state.email = response.data.email;
            state.job_title = response.data.job_title;
            state.job_level = response.data.job_level;
            profilePictureUrl.value =
                "http://localhost:8000/" + response.data.avatar_url ||
                defaultAvatarUrl; // Set profile picture URL
            console.log(profilePictureUrl);
        } else {
            alert("Failed to load profile information.");
        }
    } catch (error) {
        console.error("Error fetching profile information:", error);
    }
}

onMounted(() => {
    profileInformation();
});
</script>

<style></style>
