<template>
    <UCard class="w-[90%] sm:w-[370px] md:w-[400px] bg-white md:mx-auto p-4 shadow-lg">
        <p class="font-bold text-2xl text-center mb-8">Log In</p>
        <UForm ref="form" :schema="schema" @submit="signIn" class="grid gap-4" method="post" :state="state">
            <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" placeholder="example@gmail.com" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput type="password" v-model="state.password" placeholder="********" />
            </UFormGroup>


            <ULink class="text-sm block ml-auto hover:underline" to="forgot-password">Forgot
                Password?</ULink>


            <UButton type="submit" class="block mx-auto" size="lg">
                Log In
            </UButton>

            <UDivider label="Or" />

            <ContinueWithProvider providerLogo="/google-logo.svg" providerName="Google" href="/login/google" />
            <ContinueWithProvider providerLogo="/facebook-logo.svg" providerName="Facebook" href="/login/facebook" />
            <ContinueWithProvider providerLogo="/github-logo.svg" providerName="Github" href="/login/github" />
        </UForm>
    </UCard>
</template>

<script setup lang="ts">
import type { Form, FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string(),
});
const state = reactive({
    email: undefined,
    password: undefined,
});

const toast = useToast();
type Schema = z.output<typeof schema>;
const form = ref<Form<Schema>>();

const fetchState = ref<FetchState>(DEFAULT_FETCH_STATE);

async function signIn(e: FormSubmitEvent<Schema>) {
    fetchState.value.fetching = true;
    const response = await $fetch<ApiResponse>("/api/signin", {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement),
        ignoreResponseError: true,
    });
    fetchState.value.fetching = false;
    fetchState.value.fetched = true;

    if (response.success) {
        navigateTo("/");
        toast.clear();
        return
    }
    if (response.error) {
        const validationErrors = getValidationErrors(response.error);
        if (validationErrors) {
            form.value?.setErrors(validationErrors);
            return;
        }
    }
    toastErrorMessage(toast, response.message);
}
</script>