import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUser();

    if (to.path.startsWith("/c/")) {
        if (!user.value) {
            return navigateTo("/login/");
        }
        if (!user.value.is_verified) return navigateTo("/verify-email/");
    }
});
