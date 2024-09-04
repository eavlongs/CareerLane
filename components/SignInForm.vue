<script setup lang="ts">
import { z } from "zod";

const runtimeConfig = useRuntimeConfig();
const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const jobLevel = ref(1);

async function signIn(e: Event) {
    await $fetch(`/ ${runtimeConfig.public.apiURL}/login`, {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement),
    });
    await navigateTo("/");
}
</script>

<template>
    <UCard
        class="w-[90%] sm:w-[370px] md:w-[400px] bg-white md:mx-auto p-4 shadow-lg"
    >
        <p class="font-bold text-2xl text-center mb-8">Log In</p>
        <UFor :schema="schema" @submit.prevent="signIn" class="grid gap-4">
            <UFormGroup label="Email" name="email">
                <UInput placeholder="example@gmail.com" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput type="password" placeholder="********" />
            </UFormGroup>

            <UButton type="submit" class="block mx-auto" size="lg">
                Log In
            </UButton>

            <UDivider label="Or" />

            <ContinueWithProvider
                providerLogo="google logo"
                providerName="Google"
            />
            <ContinueWithProvider
                providerLogo="google logo"
                providerName="LinkedIn"
            />
            <ContinueWithProvider
                providerLogo="google logo"
                providerName="Github"
            />
        </UFor>
    </UCard>
</template>
