<template>
    <PageWrapper>
        <Section title="Job Description" :noData="false">
            <UForm ref="formRef" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Job Title" name="job_title" required>
                    <UInput v-model="state.job_title" :disabled="!job?.is_active" />
                </UFormGroup>

                <UFormGroup label="Job Category" name="category" required>
                    <USelect v-model="state.category" :options="jobCategories.data!.categories" value-attribute="id"
                      option-attribute="name" :disabled="!job?.is_active" />
                </UFormGroup>

                <UFormGroup label="Work Location" name="location" required>
                    <USelect v-model="state.location" :options="locations" value-attribute="id" option-attribute="name"
                      :disabled="!job?.is_active" />
                </UFormGroup>

                <UFormGroup label="Job Type" name="type" required>
                    <USelect v-model="state.type" :options="jobTypes" value-attribute="id" option-attribute="name"
                      :disabled="!job?.is_active" />
                </UFormGroup>

                <UFormGroup label="Salary Type" name="salary_type" required>
                    <URadio v-for="sType of salaryTypes" :key="sType.value" v-model="state.selectedSType" v-bind="sType"
                      :disabled="!job?.is_active" />
                </UFormGroup>

                <template v-if="state.selectedSType == 'exact'">
                    <UFormGroup label="Salary" name="salary">
                        <UInput v-model="state.salary" type="number" :disabled="!job?.is_active" />
                    </UFormGroup>
                </template>

                <template v-else-if="state.selectedSType == 'range'">
                    <UFormGroup label="Salary Start Range" name="salary_start_range" required>
                        <UInput v-model="state.salary_start_range" type="number" :disabled="!job?.is_active" />
                    </UFormGroup>
                    <UFormGroup label="Salary End Range" name="salary_end_range" required>
                        <UInput v-model="state.salary_end_range" type="number" :disabled="!job?.is_active" />
                    </UFormGroup>
                </template>

                <UFormGroup name="is_salary_negotiable">
                    <UCheckbox v-model="state.is_salary_negotiable" name="is_salary_negotiable" label="Negotiable?"
                      :disabled="!job?.is_active || (state.selectedSType == 'exact' && !state.salary)" />
                </UFormGroup>

                <UFormGroup name="description" label="Description" required>
                    <UTextarea v-model="state.description" resize :rows="10" :disabled="!job?.is_active" />
                </UFormGroup>

                <UFormGroup label="Original Deadline" name="original_deadline" required>
                    <UButton icon="i-heroicons-calendar-days-20-solid"
                      :label="format(state.original_deadline!, 'd MMM, yyy')" disabled />
                </UFormGroup>

                <UFormGroup label="Extended Deadline" name="extended_deadline" required>
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <div class="flex items-center gap-x-2">
                            <UButton icon="i-heroicons-calendar-days-20-solid"
                              :label="format(state.extended_deadline!, 'd MMM, yyy')" :disabled="!job?.is_active" />

                            ({{ daysFromNow }} {{ daysFromNow >= 2 ? "days" : "day" }} from now)
                        </div>

                        <template #panel="{ close }" v-if="!job?.is_active">
                            <DatePicker v-model="state.extended_deadline" is-required @close="close"
                              :minDate="state.original_deadline" />
                        </template>
                    </UPopover>
                </UFormGroup>

                <template v-if="job?.is_active">
                    <div class="flex items-center gap-x-4 justify-end">
                        <UButton type="button" @click="stopAcceptingApplications" size="md" color="red">
                            Stop Accepting Applications
                        </UButton>
                        <UButton type="submit" size="md" color="green">
                            Update
                        </UButton>
                    </div>
                </template>
            </UForm>
        </Section>
    </PageWrapper>
</template>

<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types'
import { differenceInCalendarDays, format } from 'date-fns'
import { type JobPost, type ApiResponse, type Category } from '~/utils/types';

definePageMeta({
    layout: "company-layout"
})

const { data: jobCategories } = await useAPI<ApiResponse<{
    categories: Category[]
}>>("/jobs/categories")

const route = useRoute()
const id = route.params.id

const daysFromNow = computed(() => differenceInCalendarDays(state.extended_deadline!, new Date()))

const locations = Array.from({ length: JobLocationEnum._LENGTH }).map((_, index) => {
    return {
        id: index,
        name: JobLocationEnumToStringMap[index]
    }
})

const jobTypes = Array.from({ length: JobTypeEnum._LENGTH }).map((_, index) => {
    return {
        id: index,
        name: JobTypeEnumToStringMap[index]
    }
})

const salaryTypes = [
    {
        value: 'exact',
        label: 'Exact'
    },
    {
        value: 'range',
        label: 'Range'
    }
]

const formRef = ref()

const { $api } = useNuxtApp()
const toast = useToast()

const schema = z.object({
    job_title: z.string().min(3, 'Must be at least 3 characters').max(100, 'Must be at most 100 characters'),
    category: z.string().min(1, 'Category is required'),
    location: z.number().refine((value) => value >= 0 && value < locations.length),
    type: z.number().refine((value) => value >= 0 && value < jobTypes.length),
    salary: z.coerce.number().refine(value => value >= 0, 'Salary must be a positive number').refine(value => value <= 10_000_000, 'Salary must be smaller or equal to 10,000,000').optional(),
    salary_start_range: z.number().positive().max(10_000_000).optional(),
    salary_end_range: z.number().positive().max(10_000_000).optional(),
    selectedSType: z.enum(['exact', 'range']),
    is_salary_negotiable: z.boolean(),
    description: z.string().min(1, 'Description is required').max(3000, 'Description must be at most 3000 characters'),
    extended_deadline: z.date().refine((value) => value > new Date(), 'Deadline must be in the future').refine((value) => differenceInCalendarDays(value, new Date()) <= 365, 'Deadline must be within a year from now').refine((value) => state.original_deadline!.getTime() <= value.getTime(), 'Extended deadline must be after the original deadline')
}).refine((obj) => {
    if (obj.selectedSType == 'exact' && !obj.salary && !obj.is_salary_negotiable) {
        return false
    }
    return true
}, {
    message: 'Salary must be negotiable if exact salary is not provided',
    path: ['is_salary_negotiable']
}).refine((obj) => {
    if (obj.selectedSType == 'range' && (!obj.salary_start_range || !obj.salary_end_range)) {
        return false
    }
    return true
}, {
    message: 'Salary start and end range must be provided',
    path: ['salary_start_range', 'salary_end_range']
}).refine((obj) => {
    if (obj.selectedSType == 'range' && obj.salary_start_range! >= obj.salary_end_range!) {
        return false
    }
    return true
}, {
    message: 'Salary start range must be less than salary end range',
    path: ['salary_start_range']
})

const state = reactive<{
    job_title: string | undefined;
    category: string | undefined;
    location: number | undefined;
    type: number | undefined;
    salary: number | undefined;
    salary_start_range: number | undefined;
    salary_end_range: number | undefined;
    selectedSType: 'exact' | 'range';
    is_salary_negotiable: boolean;
    description: string | undefined;
    original_deadline: Date | undefined;
    extended_deadline: Date | undefined;
}>({
    job_title: undefined,
    category: undefined,
    location: locations[0].id,
    type: jobTypes[0].id,
    salary: undefined,
    salary_start_range: undefined,
    salary_end_range: undefined,
    selectedSType: salaryTypes[0].value as any,
    is_salary_negotiable: true,
    description: undefined,
    original_deadline: undefined,
    extended_deadline: undefined
})

const job = ref<JobPost>()

watch(state, (value) => {
    if (typeof state.location == 'string') state.location = parseInt(state.location)
    if (typeof state.type == 'string') state.type = parseInt(state.type)
    if (value.selectedSType == 'exact') {
        state.salary_start_range = undefined
        state.salary_end_range = undefined
        if (!state.salary) {
            state.is_salary_negotiable = true
        }
    } else {
        state.salary = undefined
    }
})

type Schema = z.output<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        const data = event.data
        const response = await $api<ApiResponse>(`jobs/${job.value!.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                "job_title": data.job_title,
                "category_id": data.category,
                "location": data.location,
                "type": data.type,
                "salary": data.salary,
                "salary_start_range": data.salary_start_range,
                "salary_end_range": data.salary_end_range,
                "is_salary_negotiable": data.is_salary_negotiable,
                "description": data.description,
                "extended_deadline": data.extended_deadline.toISOString()
            })
        })

        if (response.success) {
            navigateTo("/c/jobs")
            toastSuccessMessage(toast, response.message)
            return
        }

        if (response.error) {
            const error: { [x: string]: string } = response.error
            formRef.value?.setErrors(transformValidationError(error))
        }

        else {
            throw new Error(response.message)
        }
    } catch (e: any) {
        toastErrorMessage(toast, e.message)
    }
}

const { data, status } = await useAPI<ApiResponse<{ job: JobPost }>>(`/jobs/${id}`)
if (status.value == "success") {
    job.value = data.value.data!.job

    state.job_title = job.value.title
    state.category = job.value.category_id
    state.location = job.value.location
    state.type = job.value.type
    state.salary = typeof job.value.salary == 'number' ? job.value.salary : undefined
    state.salary_start_range = Array.isArray(job.value.salary) ? job.value.salary[0] : undefined
    state.salary_end_range = Array.isArray(job.value.salary) ? job.value.salary[1] : undefined
    state.selectedSType = typeof job.value.salary == 'number' ? 'exact' : 'range'
    state.is_salary_negotiable = (job.value.is_salary_negotiable as any) == 0 ? false : true
    state.description = job.value.description
    state.original_deadline = new Date(job.value.original_deadline)
    state.extended_deadline = job.value.extended_deadline ? new Date(job.value.extended_deadline) : state.original_deadline
}

async function stopAcceptingApplications() {
    try {
        const response = await $api<ApiResponse>(`/jobs/${job.value!.id}/inactive`, {
            method: "PATCH"
        })

        if (!response.success) {
            throw new Error(response.message)
        }
        toastSuccessMessage(toast, response.message)
        navigateTo("/c/jobs")
    } catch (e: any) {
        toastErrorMessage(toast, e.message)
    }
}

</script>

<style></style>