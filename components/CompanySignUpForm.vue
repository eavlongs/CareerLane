<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const state = reactive({
    email: undefined,
    password: undefined,
    confirm_password: undefined,
    company_name: undefined,
});

const schema = z
    .object({
        company_name: z.string().min(1, "Must be at least 1 character"),
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
    }>("/api/signup-company", {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement),
    });

    if (response.success) {
        navigateTo("/");
    }
}
</script>

<template>
    <UCard class="w-[90%] sm:w-[390px] md:w-[420px] bg-white md:mx-auto p-4 shadow-lg">
        <p class="font-bold text-2xl text-center mb-8">Register Company Account</p>
        <UForm :schema="schema" :state="state" @submit.prevent="signUp" class="grid gap-4" method="post">
            <UFormGroup label="Comany Name" name="company_name">
                <UInput v-model="state.company_name" placeholder="Company Name" />
            </UFormGroup>

            <UFormGroup label="Email" name="email">
                <UInput placeholder="example@gmail.com" v-model="state.email" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput v-model="state.password" type="password" placeholder="********" />
            </UFormGroup>

            <UFormGroup label="Confirm Password" name="confirm_password">
                <UInput v-model="state.confirm_password" type="password" placeholder="********" />
            </UFormGroup>

            <UButton type="submit" class="block mx-auto" size="lg">
                Sign Up
            </UButton>

            <UDivider label="Or" />

            <ContinueWithProvider providerLogo="google logo" providerName="Google" />
            <ContinueWithProvider providerLogo="google logo" providerName="LinkedIn" />
            <ContinueWithProvider providerLogo="google logo" providerName="Github" />
        </UForm>
    </UCard>
</template>
