<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-2xl font-semibold mb-6">
            Your Email need to be verified
        </h1>

        <!-- Display the success or error message -->
        <div v-if="message" :class="messageClass" class="mb-4">
            {{ message }}
        </div>

        <!-- Button to send the verification email -->
        <button
            @click="sendVerifyEmail"
            :disabled="loading"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
        >
            <template v-if="loading"> Sending... </template>
            <template v-else> Send Verification Email </template>
        </button>
    </div>
</template>

<script setup lang="ts">
import { navigateTo, useFetch } from "nuxt/app";
import { computed, ref } from "vue";

// States to manage success message, loading state, and error
const success = ref(false);
const message = ref("");
const loading = ref(false);
const { $api } = useNuxtApp();

// Computed property to return appropriate classes for success/error message
const messageClass = computed(() => {
    return success.value ? "text-green-600" : "text-red-600";
});

// Function to handle the email verification request
async function sendVerifyEmail() {
    try {
        loading.value = true;
        // const response = await $api("test-email", {
        //     method: "POST",
        // });
        const response = await useFetch<ApiResponse>(
            "http://localhost:8000/api/send-verification-email",
            {
                method: "POST",
                credentials: "include",
            }
        );

        if (response.data.value?.success) {
            success.value = true;
            message.value = "Verification email sent successfully!";
            navigateTo("/");
        } else {
            success.value = false;
            message.value =
                response.data.value?.message ||
                "Failed to send verification email.";
        }
    } catch (error) {
        success.value = false;
        message.value = "An error occurred while sending the email.";
    } finally {
        loading.value = false;
    }
}
</script>
