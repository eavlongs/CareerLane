<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

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
    console.log(1);
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
                providerLogo="google logo"
                providerName="Google"
                href="/login/google"
            />
            <ContinueWithProvider
                providerLogo="google logo"
                providerName="LinkedIn"
                href="/login/linkedin"
            />
            <ContinueWithProvider
                providerLogo="google logo"
                providerName="Github"
                href="/login/github"
            />
        </UForm>
    </UCard>
</template>
