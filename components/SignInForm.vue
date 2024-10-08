<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters"),
});
const state = reactive({
    email: undefined,
    password: undefined,
});

type Schema = z.output<typeof schema>;

async function signIn(e: FormSubmitEvent<Schema>) {
    e.preventDefault(); // Prevent the default form submission behavior
    const response = await $fetch<{
        success: boolean;
        message: string;
    }>("/api/signin", {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement),
    });

    if (response.success) {
        navigateTo("/");
    }
}
</script>

<template>
    <UCard
        class="w-[90%] sm:w-[370px] md:w-[400px] bg-white md:mx-auto p-4 shadow-lg"
    >
        <p class="font-bold text-2xl text-center mb-8">Log In</p>
        <UForm
            :schema="schema"
            @submit="signIn"
            class="grid gap-4"
            method="post"
            :state="state"
        >
            <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" placeholder="example@gmail.com" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput
                    type="password"
                    v-model="state.password"
                    placeholder="********"
                />
            </UFormGroup>

            <UButton type="submit" class="block mx-auto" size="lg">
                Log In
            </UButton>

            <UDivider label="Or" />

            <ContinueWithProvider
                providerLogo="/google-logo.svg"
                providerName="Google"
                href="/login/google"
            />
            <ContinueWithProvider
                providerLogo="/facebook-logo.svg"
                providerName="Facebook"
                href="/login/facebook"
            />
            <ContinueWithProvider
                providerLogo="/github-logo.svg"
                providerName="Github"
                href="/login/github"
            />
        </UForm>
    </UCard>
</template>
