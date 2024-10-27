import { ApiResponse } from "~/utils/types";

export default defineEventHandler(async (event) => {
    if (!event.context.session) {
        throw createError({
            statusCode: 403,
        });
    }

    const runtimeConfig = useRuntimeConfig();

    await lucia.invalidateSession(event.context.session.id);
    appendHeader(
        event,
        "Set-Cookie",
        lucia.createBlankSessionCookie().serialize()
    );

    return {
        success: true,
        message: "Request Successful.",
    };
});
