<template>
    <UCard class="w-[90%] sm:w-[390px] md:w-[420px] bg-white md:mx-auto p-4 shadow-lg">
        <p class="font-bold text-2xl text-center mb-8">
            Register Company Account
        </p>
        <UForm ref="form" :schema="schema" :state="state" @submit.prevent="signUp" class="grid gap-4" method="post"
          :validateOn="['input', 'change', 'submit']">
            <UFormGroup label="Comany Name" name="company_name" required>
                <UInput v-model="state.company_name" placeholder="Company Name" />
            </UFormGroup>

            <UFormGroup label="Email" name="email" required>
                <UInput placeholder="example@gmail.com" v-model="state.email" />
            </UFormGroup>

            <UFormGroup label="Password" name="password" required>
                <UInput v-model="state.password" type="password" placeholder="********"
                  aria-autocomplete="new-password" />
            </UFormGroup>

            <UFormGroup label="Confirm Password" name="confirm_password" required>
                <UInput v-model="state.confirm_password" type="password" placeholder="********"
                  aria-autocomplete="new-password" />
            </UFormGroup>

            <UFormGroup label="Province/City" name="province" required>
                <USelect v-model="state.province" :options="provincesResponse.data?.provinces" value-attribute="id"
                  option-attribute="name" />
            </UFormGroup>


            <UFormGroup label="Upload Logo" name="logo" required>
                <UInput type="file" icon="i-heroicons-folder" :accept="ACCEPTED_IMAGE_TYPES.join(',')" @change="(files) => {
                    if (files.length > 0 && files[0]) {
                        state.logo = files[0];
                    }
                }" />
            </UFormGroup>


            <UButton type="submit" class="block mx-auto disabled:bg-blue-300" size="lg"
              :disabled="formSubmissionState.fetching || formSubmissionState.success">
                {{ formSubmissionState.fetching ? "Submitting" : (formSubmissionState.success ? "Redirecting" :
                    "Submit") }}
            </UButton>
        </UForm>
    </UCard>
</template>

<script setup lang="ts">
import type { Form, FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { type FetchState, type Province } from "~/utils/types";
import { LOGO_MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "~/utils/constants"

const provinces = ref<Province[]>([]);
const { $api } = useNuxtApp();

const { data: provincesResponse } = await useAPI<
    ApiResponse<{ provinces: Province[] }>
>("/provinces");

if (provincesResponse.value.success) {
    provinces.value = provincesResponse.value.data?.provinces ?? [];
}

const formSubmissionState = ref<FetchState>(DEFAULT_FETCH_STATE)

const state = reactive<{
    email?: string,
    password?: string,
    confirm_password?: string,
    company_name?: string,
    logo?: File,
    province?: string,
}>({
    email: undefined,
    password: undefined,
    confirm_password: undefined,
    company_name: undefined,
    logo: undefined,
    province: provinces.value[0].id,
});

const schema = z
    .object({
        company_name: z.string().min(1, "Must be at least 1 character"),
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Must be at least 8 characters"),
        confirm_password: z.string(),
        province: z.string(),
        logo: z
            .any()
            // .refine(file => file, "Required")
            .refine(
                (file) => file && file.size && (file.size <= LOGO_MAX_FILE_SIZE),
                `Max image size is ${LOGO_MAX_FILE_SIZE / (1024 * 1024)}MB.`
            )
            .refine(
                (file) => file && file.type && ACCEPTED_IMAGE_TYPES.includes(file.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported."
            )
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
const form = ref<Form<Schema>>()
const toast = useToast();

async function signUp(e: FormSubmitEvent<Schema>) {
    formSubmissionState.value.fetching = true;
    const response = await $api<{
        success: boolean;
        message: string;
    }>("/auth/register-company", {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement),
    });

    formSubmissionState.value.fetching = false;
    formSubmissionState.value.success = response.success || false;
    formSubmissionState.value.fetched = true;
    if (response.success) {
        navigateTo("/");
        return
    }
    if (response.error) {
        const validationErrors = getValidationErrors(response.error);
        if (validationErrors) {
            form.value?.setErrors(validationErrors);
        } else {
            toastErrorMessage(toast, response.message);
        }
    }
}
</script>
