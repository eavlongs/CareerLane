<template>
    <div>
        <h1>Email Verification</h1>
        <h1 v-if="loading">Loading....</h1>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const { $api } = useNuxtApp();
const router = useRouter();
const loading = ref(true);
onMounted(() => {
    // Extract the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    // Check if the token exists in the URL
    if (token) {
        verifyToken(token); // Call the token verification function
    } else {
        alert("No token found in the URL");
        loading.value = false;
    }
});
// Function to verify the token
async function verifyToken(token: string) {
    try {
        const response = await $api<{
            success: boolean;
            message: string;
        }>(`/verify-token?token=${token}`, {
            method: "POST",
        });

        if (response.success) {
            router.push("/c/dashboard"); // Redirect to dashboard on success
        } else {
            alert("Token verification failed: " + response.message);
        }
    } catch (error) {
        alert("Error verifying token");
        console.error(error);
    } finally {
        loading.value = false; // Stop the loading state after verification
    }
}

// Run when the component is mounted
</script>
