<template>
    <UCard class="w-[90%] sm:w-[370px] md:w-[400px] bg-white p-4 shadow-lg">
        <p class="font-bold text-2xl text-center mb-8">Forgot Password</p>

        <!-- Form for resetting the password -->
        <UForm
            @submit.prevent="sendForgotPasswordEmail"
            class="grid gap-4"
            method="post"
            :state="state"
        >
            <!-- Email input field -->
            <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" placeholder="example@gmail.com" />
            </UFormGroup>

            <!-- Submit button -->
            <UButton type="submit" class="block mx-auto mt-5" size="lg">
                Send
            </UButton>
        </UForm>
    </UCard>
</template>

<script lang="ts" setup>
// Define the validation schema

const state = reactive({
    email: undefined,
});

const runtimeConfig = useRuntimeConfig();
async function sendForgotPasswordEmail() {
    console.log(1);
    const response = await $fetch<{
        success: boolean;
        message: string;
    }>(`${runtimeConfig.public.apiURL}/auth/send-forgot-password-email`, {
        method: "POST",
        body: JSON.stringify({
            email: state.email,
        }),
    });

    if (response.success) {
        alert("Please Check Your Email");
        navigateTo("/");
    } else {
        alert(response.message || "Failed to send the email.");
    }
}
</script>

<style></style>
