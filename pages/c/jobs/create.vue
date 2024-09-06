<template>
    <PageWrapper>
        <Section title="Create New Job">
            <UForm ref="formRef" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Job Title" name="job_title" required>
                    <UInput v-model="state.job_title" />
                </UFormGroup>

                <UFormGroup label="Job Category" name="category" required>
                    <USelect v-model="state.category" :options="jobCategories" value-attribute="id"
                      option-attribute="name" />
                </UFormGroup>

                <UFormGroup label="Work Location" name="location" required>
                    <USelect v-model="state.location" :options="locations" value-attribute="id"
                      option-attribute="name" />
                </UFormGroup>

                <UFormGroup label="Job Type" name="type" required>
                    <USelect v-model="state.type" :options="jobTypes" value-attribute="id" option-attribute="name" />
                </UFormGroup>

                <UFormGroup label="Salary Type" name="salary_type" required>
                    <URadio v-for="sType of salaryTypes" :key="sType.value" v-model="state.selectedSType"
                      v-bind="sType" />
                </UFormGroup>

                <template v-if="state.selectedSType == 'exact'">
                    <UFormGroup label="Salary" name="salary">
                        <UInput v-model="state.salary" type="number" />
                    </UFormGroup>
                </template>

                <template v-else-if="state.selectedSType == 'range'">
                    <UFormGroup label="Salary Start Range" name="salary_start_range" required>
                        <UInput v-model="state.salary_start_range" type="number" />
                    </UFormGroup>
                    <UFormGroup label="Salary End Range" name="salary_end_range" required>
                        <UInput v-model="state.salary_end_range" type="number" />
                    </UFormGroup>
                </template>

                <UFormGroup name="is_salary_negotiable">
                    <UCheckbox v-model="state.is_salary_negotiable" name="is_salary_negotiable" label="Negotiable?"
                      :disabled="state.selectedSType == 'exact' && !state.salary" />
                </UFormGroup>

                <UFormGroup name="description" label="Description" required>
                    <UTextarea v-model="state.description" resize :rows="10" />
                </UFormGroup>

                <UFormGroup label="Deadline" name="deadline" required>
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <div class="flex items-center gap-x-2">
                            <UButton icon="i-heroicons-calendar-days-20-solid"
                              :label="format(state.deadline, 'd MMM, yyy')" />

                            ({{ daysFromNow }} {{ daysFromNow >= 2 ? "days" : "day" }} from now)
                        </div>

                        <template #panel="{ close }">
                            <DatePicker v-model="state.deadline" is-required @close="close" :minDate="new Date()" />
                        </template>
                    </UPopover>
                </UFormGroup>

                <UButton type="submit" size="md" color="green" class="block ml-auto">
                    Submit
                </UButton>
            </UForm>
        </Section>
    </PageWrapper>
</template>

<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types'
import { differenceInCalendarDays, format } from 'date-fns'
import type { ApiResponse, Category } from '~/utils/types';

definePageMeta({
    layout: "company-layout"
})

const daysFromNow = computed(() => differenceInCalendarDays(state.deadline, new Date()))

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

const jobCategories = ref<Category[]>([])

getCategories()

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
    deadline: z.date().refine((value) => value > new Date(), 'Deadline must be in the future').refine((value) => differenceInCalendarDays(value, new Date()) <= 365, 'Deadline must be within a year from now')
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

const state = reactive({
    job_title: undefined,
    category: jobCategories.value.length > 0 ? jobCategories.value[0].id : undefined,
    location: locations[0].id,
    type: jobTypes[0].id,
    salary: undefined,
    salary_start_range: undefined,
    salary_end_range: undefined,
    selectedSType: salaryTypes[0].value,
    is_salary_negotiable: true,
    description: undefined,
    deadline: new Date()
})

watch(state, (value) => {
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
        const response = await $api<ApiResponse>("jobs", {
            method: "POST",
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
                "deadline": data.deadline.toISOString()
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

async function getCategories() {
    const { data, status } = useAPI<ApiResponse<{
        categories: Category[]
    }>>("/jobs/categories")

    jobCategories.value = data.value.data!.categories
    if (status.value == "success") {
    }
}

</script>

<style></style>