export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUser();
    const data = await useRequestFetch()("/api/user");
    console.log(data);
    let isLoggedIn = false;
    if (data) {
        user.value = data;
        isLoggedIn = true;
    }

    if (!isLoggedIn && to.path.startsWith("/c/")) {
        return navigateTo("/sign-in");
    }
});
