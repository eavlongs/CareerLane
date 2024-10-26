<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="w-[90%] sm:w-[370px] md:w-[400px] bg-white p-4 shadow-lg">
            <!-- Token Verification and Reset Password Form -->
            <h1 class="text-center font-bold text-2xl mb-4">Forgot Password</h1>

            <!-- Show loading while verifying the token -->
            <p v-if="loading" class="text-center">Verifying your token...</p>

            <!-- Show error message if token verification fails -->
            <p v-else-if="error" class="text-center text-red-500">
                {{ error }}
            </p>

            <!-- Show success message and reset password form when token is verified -->
            <div v-else>
                <p class="text-center text-green-500 mb-4">
                    Token verified successfully! Please enter your new password.
                </p>

                <!-- Reset Password Form -->
                <UForm @submit.prevent="forgotPassword" class="grid gap-4" method="post" :state="state">
                    <UFormGroup label="New Password" name="new_password">
                        <UInput type="password" v-model="state.new_password" placeholder="*********" />
                    </UFormGroup>

                    <UFormGroup label="Confirm New Password" name="new_confirm_password">
                        <UInput type="password" v-model="state.new_confirm_password" placeholder="*********" />
                    </UFormGroup>

                    <!-- Submit button -->
                    <UButton type="submit" class="block mx-auto mt-5" size="lg">
                        Forgot Password
                    </UButton>
                </UForm>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const { $api, $fetch } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();

const loading = ref(true); // For token verification state
const error = ref<string | null>(null); // To hold error messages

// Reactive form state
const state = reactive({
    new_password: "",
    new_confirm_password: "",
});

// Extract token from route
const token = route.params.token as string;

// Function to verify the token
async function verifyToken(token: string) {
    try {
        const response = await $api<{
            success: boolean;
            message: string;
        }>(`/auth/verify-forgot-password-token`, {
            method: "POST",
            body: JSON.stringify({ token }),
        });

        if (!response.success) {
            error.value = response.message || "Invalid token.";
        }
    } catch (e) {
        error.value = "Error verifying token.";
        console.error(e);
    } finally {
        loading.value = false; // Stop loading state
    }
}

// Function to handle password reset
async function forgotPassword() {
    try {
        const response = await $api<{
            success: boolean;
            message: string;
        }>(`${runtimeConfig.public.apiURL}/auth/forgot-password`, {
            method: "POST",
            body: JSON.stringify({
                new_password: state.new_password,
                new_confirm_password: state.new_confirm_password,
                token: route.params.token, // Send the verified token with the request
            }),
        });

        if (response.success) {
            alert("Your password has been reset successfully.");
            router.push("/"); // Redirect after successful password reset
        } else {
            alert(response.message || "Failed to reset the password.");
        }
    } catch (error) {
        alert("An error occurred during the password reset process.");
        console.error(error);
    }
}

// Run on component mount: verify token
onMounted(() => {
    if (token) {
        verifyToken(token);
    } else {
        error.value = "No token found in the URL.";
        loading.value = false;
    }
});
</script>
