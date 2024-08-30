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
</script>

<template>
    <UCard class="w-[400px] bg-gray-100 mx-auto p-5">
        <UForm
            :validate="validate"
            :state="state"
            @submit="onSubmit"
            class="grid gap-4"
        >
            <UFormGroup label="First Name" name="firstName">
                <UInput v-model="state.firstName" placeholder="Zhou" />
            </UFormGroup>

            <UFormGroup label="Last Name" name="lastName">
                <UInput v-model="state.lastName" placeholder="Bovisal" />
            </UFormGroup>

            <!-- <UFormGroup label="Job Title" name="jobTitle">
                <UInput
                    v-model="state.jobTitle"
                    placeholder="Software Engineering"
                />
            </UFormGroup>

            <UFormGroup label="Job Level" name="jobLevel">
                <USelect
                    v-model="jobLevel"
                    :options="jobLevels"
                    option-attribute="name"
                />
            </UFormGroup> -->

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

            <div class="flex justify-end">
                <UButton type="submit"> Sign Up </UButton>
            </div>
        </UForm>
    </UCard>
</template>
