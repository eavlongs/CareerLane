<script setup lang="ts">
import type { FormError } from "#ui/types";
const runtimeConfig = useRuntimeConfig();
const state = reactive({
    email: undefined,
    password: undefined,
    firstName: undefined,
    lastName: undefined,
});

const validate = (state: any): FormError[] => {
    const errors = [];
    if (!state.email) errors.push({ path: "email", message: "Required" });
    if (!state.password) errors.push({ path: "password", message: "Required" });
    return errors;
};

const jobLevels = [
    {
        name: "Entry",
        value: 1,
    },
    {
        name: "Junior",
        value: 2,
    },
    {
        name: "Senior",
        value: 3,
    },
];

const jobLevel = ref(1);

async function signUp(e: Event) {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(1);
    await $fetch(`${runtimeConfig.public.apiURL}/register`, {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement),
    });

    await navigateTo("/");
}
</script>

<template>
    <UCard
        class="w-[90%] sm:w-[390px] md:w-[420px] bg-white md:mx-auto p-4 shadow-lg"
    >
        <p class="font-bold text-2xl text-center mb-8">Register Account</p>
        <UForm
            :validate="validate"
            :state="state"
            @submit.prevent="signUp"
            class="grid gap-4"
            method="post"
        >
            <UFormGroup label="First Name" name="firstName">
                <UInput v-model="state.firstName" placeholder="John" />
            </UFormGroup>

            <UFormGroup label="Last Name" name="lastName">
                <UInput v-model="state.lastName" placeholder="Doe" />
            </UFormGroup>
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
                Sign Up
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
