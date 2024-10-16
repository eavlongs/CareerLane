import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useAPI } from "~/composables/useAPI";
import type { ApiResponse, CompanyProfile } from "~/utils/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const { data } = await useAPI<ApiResponse<CompanyProfile>>(
            "/company-profile"
        );
        console.log(data.value);
        if (data.value.data?.is_verify == false && to.path.startsWith("/c/")) {
            return navigateTo("/verify-email/");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);

        return navigateTo("/");
    }
});
