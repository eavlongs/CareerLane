<template>
    <div class="w-[80%] max-w-[32rem] bg-white p-4 shadow-lg">
        <!-- Token Verification and Reset Password Form -->
        <h1 class="text-center font-bold text-2xl mb-4">Reset Password</h1>

        <!-- Show loading while verifying the token -->
        <p v-if="loading" class="text-center">Verifying your token...</p>

        <!-- Show error message if token verification fails -->
        <p v-else-if="error" class="text-center text-red-500">
            {{ error }}
        </p>

        <!-- Show success message and reset password form when token is verified -->
        <div v-else>
            <!-- Reset Password Form -->
            <UForm @submit.prevent="resetPassword" class="grid gap-4" method="post" :state="state" :schema="schema"
              ref="form">
                <UFormGroup label="New Password" name="new_password">
                    <UInput type="password" v-model="state.new_password" placeholder="*********" />
                </UFormGroup>

                <UFormGroup label="Confirm New Password" name="new_confirm_password">
                    <UInput type="password" v-model="state.new_confirm_password" placeholder="*********" />
                </UFormGroup>

                <!-- Submit button -->
                <UButton type="submit" class="block mx-auto mt-5" size="lg" :disabled="fetchState.fetching">
                    {{ fetchState.fetching ? "Submitting..." : "Submit" }}
                </UButton>
            </UForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { z } from "zod";
import type { Form } from "#ui/types";

const { $api } = useNuxtApp();
const route = useRoute();

const loading = ref(true); // For token verification state
const error = ref<string | null>(null); // To hold error messages
const fetchState = ref<FetchState>(DEFAULT_FETCH_STATE)

// Reactive form state
const state = reactive({
    new_password: "",
    new_confirm_password: "",
});

const schema = z.object({
    new_password: z.string().min(8),
    new_confirm_password: z.string().min(8),
}).refine(data =>
    data.new_password == data.new_confirm_password, {
    message: "Passwords do not match.",
    path: ["new_confirm_password"],
})

type Schema = z.infer<typeof schema>;

const form = ref<Form<Schema>>()
const toast = useToast()

// Extract token from route
const token = route.params.token as string;

// Function to verify the token
async function verifyToken(token: string) {
    try {
        const response = await $api<ApiResponse>(`/auth/verify-reset-password-token/${token}`);

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
async function resetPassword() {
    fetchState.value.fetching = true;
    try {
        const response = await $api<ApiResponse>(`/auth/reset-password`, {
            method: "POST",
            body: JSON.stringify({
                new_password: state.new_password,
                new_confirm_password: state.new_confirm_password,
                token: route.params.token, // Send the verified token with the request
            }),
        });

        if (response.success) {
            toastSuccessMessage(toast, response.message);
            navigateTo("/login");
        } else {
            if (response.error) {
                const validationErrors = getValidationErrors(response.error);
                form.value?.setErrors(validationErrors);
                return
            }
            toastErrorMessage(toast, response.message || "Failed to reset the password.");
        }
    } catch (error) {
        toastErrorMessage(toast, "An error occurred during the password reset process.");
        console.error(error);
    } finally {
        fetchState.value.fetching = false;
    }
}

onMounted(async () => {
    await verifyToken(token);
});
</script>
