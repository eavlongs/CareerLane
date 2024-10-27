export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUser();
    const data = await useRequestFetch()("/api/user");

    if (data) {
        user.value = data;
    }
    if (
        user.value &&
        ["/login", "/register", "/register-company"].includes(to.path)
    ) {
        return navigateTo("/");
    }
    if (to.path.startsWith("/c/")) {
        if (!user.value) {
            return navigateTo("/login");
        }
        if (user.value.role != UserTypeEnum.Company) {
            return navigateTo("/");
        }
    }
});
