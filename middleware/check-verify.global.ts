import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useAPI } from "~/composables/useAPI";
import {
    UserTypeEnum,
    type ApiResponse,
    type CompanyProfile,
} from "~/utils/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUser();
    if (!user.value || user.value.role != UserTypeEnum.Company) {
    }
    try {
        const { data } = await useAPI<ApiResponse<CompanyProfile>>(
            "/company/information"
        );
        if (data.value.data?.is_verify == false && to.path.startsWith("/c/")) {
            return navigateTo("/verify-email/");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);

        return navigateTo("/");
    }
});
