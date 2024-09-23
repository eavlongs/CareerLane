export default defineEventHandler(async (event) => {
    const formData = await readFormData(event);
    const runtimeConfig = useRuntimeConfig();
    const response = await $fetch<{
        success: boolean;
        error?: any;
        message: string;
        data?: {
            account_id: string;
        };
    }>(`${runtimeConfig.public.apiURL}/register-company`, {
        method: "POST",
        body: formData,
        ignoreResponseError: true,
    });

    console.log(response);
    if (!response.success) {
        return {
            success: false,
            message: response.message,
            error: response.error,
        };
    }
    const accountId = response.data!.account_id;

    const session = await lucia.createSession(accountId, {});

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
