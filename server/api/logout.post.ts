import { ApiResponse } from "~/utils/types";

export default defineEventHandler(async (event) => {
    if (!event.context.session) {
        throw createError({
            statusCode: 403,
        });
    }

    const runtimeConfig = useRuntimeConfig();
    const response = await $fetch<ApiResponse>(
        `${runtimeConfig.public.apiURL}/auth/logout`,
        {
            method: "POST",
        }
    );

    if (!response.success) {
        return {
            success: false,
            message: response.message,
            error: response.error,
        };
    }

    const deleteSession = await lucia.invalidateSession(
        event.context.session.id
    );
    appendHeader(
        event,
        "Set-Cookie",
        lucia.createBlankSessionCookie().serialize()
    );

    return {
        success: true,
        message: response.message,
    };
});
