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
    }>(`${runtimeConfig.public.apiURL}/login`, {
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
    console.log(1);
    const userId = response.data!.user_id;
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
