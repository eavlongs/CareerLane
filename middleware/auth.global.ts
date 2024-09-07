export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUser();
    const data = await useRequestFetch()("/api/user");

    let isLoggedIn = false;
    console.log(data);
    if (data) {
        user.value = data;

        isLoggedIn = true;
    }

    if (
        isLoggedIn &&
        ["/login", "/register", "/register-company"].includes(to.path)
    ) {
        return navigateTo("/");
    }
    if (!isLoggedIn && to.path.startsWith("/c/")) {
        return navigateTo("/login");
    }
});
