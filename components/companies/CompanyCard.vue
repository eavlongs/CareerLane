<template>
    <div
        class="flex items-center p-4 border border-gray-200 rounded hover:bg-gray-50"
    >
        <!-- Company Logo -->
        <NuxtLink :to="`/company/${company.id}`" class="flex-shrink-0">
            <img
                :src="company.logo_url || '/fallback-logo.png'"
                alt="Company Logo"
                class="h-16 w-16 rounded object-cover"
            />
        </NuxtLink>
        <!-- Company Info -->
        <div class="ml-4 flex-grow">
            <NuxtLink
                :to="`/company/${company.id}`"
                class="block text-xl font-semibold hover:underline"
            >
                {{ company.name }}
            </NuxtLink>
            <p class="text-gray-600 text-sm">{{ company.description }}</p>
            <p class="text-gray-500 text-xs mt-1">
                {{ company.posts }} posts • {{ company.members }} members
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Company } from "~/utils/types";

// Props for company data
const props = defineProps<{
    company: Company;
}>();
</script>

<style scoped></style>
