<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <div class="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-2xl font-bold mb-6">Company Listings</h1>

            <!-- Company Cards -->
            <div v-if="isLoading" class="text-center">Loading...</div>
            <div v-else-if="error" class="text-center text-red-500">
                Failed to load company data.
            </div>
            <div v-else class="space-y-4">
                <CompanyCard
                    v-for="company in companies"
                    :key="company.id"
                    :company="company"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

// API response data
const companies = ref<Company>();
const isLoading = ref(true);
const error = ref(null);

// Fetch data from the API on mount
async function fetchCompanies() {
    try {
        const { data: companiesResponse } = await useAPI<ApiResponse<Company>>(
            "/company/all",
            {
                credentials: "include",
            }
        );
        console.log(companiesResponse.value.data);
        if (companiesResponse.value.success && companiesResponse.value.data) {
            companies.value = companiesResponse.value.data;
        } else {
            alert(
                companiesResponse.value.message || "Failed to load company data"
            );
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while fetching company data.");
    } finally {
        isLoading.value = false;
    }
}

// Fetch companies on component mount
onMounted(fetchCompanies);
</script>

<style scoped></style>
