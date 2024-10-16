<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="w-[90%] sm:w-[370px] md:w-[400px] bg-white p-4 shadow-lg">
            <h1 class="text-center font-bold text-2xl mb-4">
                Email Verification
            </h1>
            <p v-if="loading" class="text-center">Verifying your email...</p>
            <p v-else-if="error" class="text-center text-red-500">
                {{ error }}
            </p>
            <p v-else class="text-center text-green-500">
                Email verified successfully! Redirecting...
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const { $api } = useNuxtApp();
const router = useRouter();
const route = useRoute();

const loading = ref(true);
const error = ref<string | null>(null);

// Function to verify the token
async function verifyToken(token: string) {
    try {
        const response = await $fetch<ApiResponse>(
            `http://localhost:8000/api/verify-token?${token}`,
            {
                method: "POST",
                credentials: "include",
            }
        );

        if (response.success) {
            setTimeout(() => router.push("/c/dashboard"), 2000); // Redirect to dashboard after a short delay
        } else {
            error.value = response.message;
        }
    } catch (e) {
        error.value = "Error verifying token";
        console.error(e);
    } finally {
        loading.value = false; // Stop the loading state after verification
    }
}

// Run when the component is mounted
onMounted(() => {
    const token = route.params.token as string; // Extract token from query params

    // Check if the token exists in the query string
    if (token) {
        verifyToken(token); // Call the token verification function
    } else {
        error.value = "No token found in the URL";
        loading.value = false;
    }
});
</script>
