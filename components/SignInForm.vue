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
    <UCard class="w-[420px] bg-gray-100 mx-auto p-5 shadow-lg">
        <div class="leading-[10px]">
            <p class="font-mono font-bold text-2xl leading-[5rem]">
                Log In Into Your Account
            </p>
            <p class="font-mono text-sm text-center">
                Hey, Enter your Information to sign in into your account
            </p>
        </div>
        <UForm
            :validate="validate"
            :state="state"
            @submit="onSubmit"
            class="grid gap-4 pt-10"
        >
            <UFormGroup label="Email" name="email">
                <UInput
                    v-model="state.email"
                    placeholder="zhoubovisal@gmail.com"
                />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput
                    v-model="state.password"
                    type="password"
                    placeholder="XKVJFV$FJC#"
                />
            </UFormGroup>

            <div class="flex justify-center p-5">
                <UButton type="submit"> Log In </UButton>
            </div>
        </UForm>
    </UCard>
</template>
