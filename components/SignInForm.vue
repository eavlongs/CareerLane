<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

const state = reactive({
    email: undefined,
    password: undefined,
});

const validate = (state: any): FormError[] => {
    const errors = [];
    if (!state.email) errors.push({ path: "email", message: "Required" });
    if (!state.password) errors.push({ path: "password", message: "Required" });
    return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
    // Do something with data
    console.log(event.data);
}

const jobLevel = ref(1);
</script>

<template>
    <UCard class="w-[90%] sm:w-[370px] md:w-[400px] bg-white md:mx-auto p-4 shadow-lg">
        <p class="font-bold text-2xl text-center mb-8">
            Log In
        </p>
        <UForm :validate="validate" :state="state" @submit="onSubmit" class="grid gap-4">
            <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" placeholder="example@gmail.com" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput v-model="state.password" type="password" placeholder="********" />
            </UFormGroup>


            <UButton type="submit" class="block mx-auto" size="lg"> Log In </UButton>

            <UDivider label="Or" />

            <ContinueWithProvider providerLogo="google logo" providerName="Google" />
            <ContinueWithProvider providerLogo="google logo" providerName="LinkedIn" />
            <ContinueWithProvider providerLogo="google logo" providerName="Github" />
        </UForm>
    </UCard>
</template>
