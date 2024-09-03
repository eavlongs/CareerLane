<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
    email: undefined,
    password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with data
    console.log(event.data.email);
}

const jobLevel = ref(1);

const apiUrl = process.env.NUXT_PUBLIC_API_URL as string;
async function signup(e: Event) {
    await $fetch(`/ {{apiUrl}} /login`, {
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
        <UForm
            :schema="schema"
            :state="state"
            @submit="onSubmit"
            class="grid gap-4"
        >
            <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" placeholder="example@gmail.com" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput
                    v-model="state.password"
                    type="password"
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
            />
            <ContinueWithProvider
                providerLogo="google logo"
                providerName="LinkedIn"
            />
            <ContinueWithProvider
                providerLogo="google logo"
                providerName="Github"
            />
        </UForm>
    </UCard>
</template>
