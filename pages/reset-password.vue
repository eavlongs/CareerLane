<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

// Define the validation schema
const schema = z.object({
    email: z.string().email("Invalid email"),
});

const state = reactive({
    old_password: undefined,
    new_password: undefined,
    new_confirm_password: undefined,
});

type Schema = z.output<typeof schema>;

async function resetPassword(e: FormSubmitEvent<Schema>) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Send a POST request to initiate the password reset process
    const response = await $fetch<{
        success: boolean;
        message: string;
    }>("/api/reset-password", {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement),
    });

    if (response.success) {
        alert("Password reset link has been sent to your email.");
        navigateTo("/");
    } else {
        alert(response.message || "Failed to send reset email.");
    }
}
</script>

<template>
    <!-- Center the card in the middle of the screen -->
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <UCard class="w-[90%] sm:w-[370px] md:w-[400px] bg-white p-4 shadow-lg">
            <p class="font-bold text-2xl text-center mb-8">Reset Password</p>

            <!-- Form for resetting the password -->
            <UForm
                :schema="schema"
                @submit="resetPassword"
                class="grid gap-4"
                method="post"
                :state="state"
            >
                <!-- Email input field -->
                <UFormGroup label="Old Password" name="old_password">
                    <UInput
                        v-model="state.old_password"
                        placeholder="*********"
                    />
                </UFormGroup>

                <UFormGroup label="New Password" name="new_password">
                    <UInput
                        v-model="state.new_password"
                        placeholder="*********"
                    />
                </UFormGroup>

                <UFormGroup
                    label="New Confirm Password"
                    name="new_confirm_password"
                >
                    <UInput
                        v-model="state.new_confirm_password"
                        placeholder="*********"
                    />
                </UFormGroup>

                <!-- Submit button -->
                <UButton type="submit" class="block mx-auto mt-5" size="lg">
                    Send Reset Link
                </UButton>
            </UForm>
        </UCard>
    </div>
</template>
