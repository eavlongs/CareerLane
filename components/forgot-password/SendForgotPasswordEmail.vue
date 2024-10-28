<template>
    <UCard class="w-[80%] max-w-[32rem] bg-white p-4 shadow-lg">
        <p class="font-bold text-2xl text-center mb-8">Forgot Password</p>

        <!-- Form for resetting the password -->
        <UForm ref="form" class="grid gap-4" method="post" :state="state" :schema="schema"
          @submit.prevent="sendResetPasswordEmail">
            <!-- Email input field -->
            <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" placeholder="example@gmail.com" />
            </UFormGroup>

            <div v-if="message" :class="messageClass" class="mb-4">
                {{ message }}
            </div>

            <!-- Submit button -->
            <UButton type="submit" class="block mx-auto mt-5" size="lg" :disabled="fetchState.fetching">
                {{ fetchState.fetching ? "Sending..." : "Send Email" }}
            </UButton>
        </UForm>
    </UCard>
</template>

<script lang="ts" setup>
import { z } from 'zod';
import type { Form } from '#ui/types'

// Define the validation schema

const state = reactive({
    email: undefined,
});

const schema = z.object({
    email: z.string().email(),
})

type Schema = z.infer<typeof schema>;
const form = ref<Form<Schema>>()

const fetchState = ref<FetchState>(DEFAULT_FETCH_STATE)
const message = ref("")

const { $api } = useNuxtApp()

const messageClass = computed(() => {
    return fetchState.value.success ? "text-green-600" : "text-red-600";
});

async function sendResetPasswordEmail() {
    fetchState.value.fetching = true;
    message.value = "";
    const response = await $api<ApiResponse>('/auth/send-reset-password-email', {
        method: "POST",
        body: JSON.stringify({
            email: state.email,
        }),
    });

    fetchState.value.fetching = false;
    if (response.success) {
        fetchState.value.success = true;
        message.value = response.message;
    } else {
        if (response.error) {
            const validationErrors = getValidationErrors(response.error);
            if (validationErrors) {
                form.value?.setErrors(validationErrors);
                return
            }
        }
        fetchState.value.success = false;
        message.value = response.message || "Failed to send verification email.";
    }
}
</script>
