export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const baseURL = config.public.apiURL;
    const api = $fetch.create({
        // baseURL: "http://localhost:8000/api",
        baseURL: baseURL,
        credentials: "include",
        ignoreResponseError: true,
    });

    return {
        provide: {
            api,
        },
    };
});
