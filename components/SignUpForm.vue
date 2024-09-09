<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const state = reactive({
    email: undefined,
    password: undefined,
    confirm_password: undefined,
    first_name: undefined,
    last_name: undefined,
});

const schema = z
    .object({
        first_name: z.string().min(1, "Must be at least 1 character"),
        last_name: z.string().min(1, "Must be at least 1 character"),
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Must be at least 8 characters"),
        confirm_password: z.string(),
    })
    .refine(
        (obj) => {
            return obj.password === obj.confirm_password;
        },
        {
            message: "Password and confirm password must match",
            path: ["confirm_password"],
        }
    );

type Schema = z.output<typeof schema>;

async function signUp(e: FormSubmitEvent<Schema>) {
    e.preventDefault(); // Prevent the default form submission behavior
    const response = await $fetch<{
        success: boolean;
        message: string;
    }>("/api/signup", {
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
        class="w-[90%] sm:w-[390px] md:w-[420px] bg-white md:mx-auto p-4 shadow-lg"
    >
        <p class="font-bold text-2xl text-center mb-8">Register Account</p>
        <UForm
            :schema="schema"
            :state="state"
            @submit.prevent="signUp"
            class="grid gap-4"
            method="post"
        >
            <UFormGroup label="First Name" name="first_name">
                <UInput v-model="state.first_name" placeholder="John" />
            </UFormGroup>

            <UFormGroup label="Last Name" name="last_name">
                <UInput v-model="state.last_name" placeholder="Doe" />
            </UFormGroup>
            <UFormGroup label="Email" name="email">
                <UInput placeholder="example@gmail.com" v-model="state.email" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput
                    v-model="state.password"
                    type="password"
                    placeholder="********"
                />
            </UFormGroup>

            <UFormGroup label="Confirm Password" name="confirm_password">
                <UInput
                    v-model="state.confirm_password"
                    type="password"
                    placeholder="********"
                />
            </UFormGroup>

            <UButton type="submit" class="block mx-auto" size="lg">
                Sign Up
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
