export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUser();
    const data = await useRequestFetch()("/api/user");

    let isLoggedIn = false;
    if (data) {
        user.value = data;
        isLoggedIn = true;
    }

    if (
        isLoggedIn &&
        to.path.startsWith("/login" || to.path.startsWith("/register"))
    ) {
        return navigateTo("/");
    }
    if (!isLoggedIn && to.path.startsWith("/c/")) {
        return navigateTo("/login");
    }
});
