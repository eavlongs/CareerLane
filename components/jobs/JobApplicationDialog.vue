<template>
    <Dialog :modelValue="modelValue" @update:modelValue="value => emits('update:modelValue', value)"
      :withWrapper="false">
        <UForm ref="form" :state="state" :schema="schema" :validateOn="['input', 'change', 'submit']"
          @submit.prevent="uploadCV" method="post">
            <DialogContentWrapper :title="`Apply for ${job.title} position`" :is-form-submit-button="true">
                <UFormGroup label="Upload CV" name="cv"
                  :help="job.applied ? 'You have already submitted the application once. The new application will override the old one' : ''"
                  required>
                    <UInput type="file" icon="i-heroicons-folder" :accept="ACCEPTED_CV_TYPES.join(',')" @change="(files) => {
                        if (files.length > 0 && files[0]) {
                            state.cv = files[0];
                        }
                    }" />
                </UFormGroup>
            </DialogContentWrapper>
        </UForm>
    </Dialog>
</template>

<script lang="ts" setup>
import { z } from 'zod';
import type { Form, FormSubmitEvent } from "#ui/types"

type Props = {
    modelValue: boolean;
    job: JobPost & { applied: boolean };
}

const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue'])

const state = reactive<{
    cv: File | undefined;
}>({
    cv: undefined
})

const schema = z.object({
    cv: z
        .any()
        .refine(file => file, "Required")
        .refine(
            (file) => file && file.size && (file.size <= LOGO_MAX_FILE_SIZE),
            `Max image size is ${LOGO_MAX_FILE_SIZE / (1024 * 1024)}MB.`
        )
        .refine(
            (file) => file && file.type && ACCEPTED_CV_TYPES.includes(file.type),
            "Only .doc, .docx, and .pdf formats are supported."
        )
})

type Schema = z.output<typeof schema>;
const form = ref<Form<Schema>>()
const toast = useToast();

const { $api } = useNuxtApp();

async function uploadCV(e: FormSubmitEvent<Schema>) {
    const response = await $api<ApiResponse>(`/jobs/${props.job.id}/apply`, {
        method: 'POST',
        body: new FormData(e.target as HTMLFormElement)
    })

    if (response.success) {
        toastSuccessMessage(toast, 'Application submitted successfully');
        emits('update:modelValue', false);
        return;
    }

    if (response.error) {
        const validationErrors = getValidationErrors(response.error);
        if (validationErrors) {
            form.value?.setErrors(validationErrors);
            return
        }
    }
    toastErrorMessage(toast, response.message);
}

</script>
