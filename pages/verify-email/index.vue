<template>
    <div class="flex flex-col items-center justify-center h-[calc(100vh-4rem-4rem)]">
        <h1 class="text-2xl font-semibold mb-6">PLease verify your email</h1>

        <!-- Display the success or error message -->
        <div v-if="message" :class="messageClass" class="mb-4">
            {{ message }}
        </div>

        <!-- Button to send the verification email -->
        <button @click="sendVerifyEmail" :disabled="fetchState.fetching"
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50">
            <template v-if="fetchState.fetching"> Sending... </template>
            <template v-else> Send Verification Email </template>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

definePageMeta({
    layout: "company-layout",
});

const message = ref("");
const { $api } = useNuxtApp();
const fetchState = ref<FetchState>(DEFAULT_FETCH_STATE)

// Computed property to return appropriate classes for success/error message
const messageClass = computed(() => {
    return fetchState.value.success ? "text-green-600" : "text-red-600";
});

// Function to handle the email verification request
async function sendVerifyEmail() {
    fetchState.value.fetching = true;
    const response = await $api<ApiResponse>(
        "/auth/send-verification-email",
        {
            method: "POST",
        }
    );

    if (response.success) {
        fetchState.value.success = true;
        message.value = response.message;
    } else {
        fetchState.value.success = false;
        message.value = response.message || "Failed to send verification email.";
    }

    fetchState.value.fetching = false;
}
</script>
