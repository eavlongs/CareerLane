export default defineEventHandler(async (event) => {
    const formData = await readFormData(event);
    const runtimeConfig = useRuntimeConfig();
    const response = await $fetch<{
        success: boolean;
        error?: any;
        message: string;
        data?: {
            user_id: string;
        };
    }>(`${runtimeConfig.public.apiURL}/register`, {
        method: "POST",
        body: formData,
    });

    if (!response.success) {
        return {
            success: false,
            message: response.message,
            error: response.error,
        };
    }
    const userId = response.data!.user_id;
    console.log("New user: " + userId);
    const session = await lucia.createSession(userId, {});
    appendHeader(
        event,
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
    );

    return {
        success: true,
        message: response.message,
    };
});
