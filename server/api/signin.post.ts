import { ApiResponse } from "~/utils/types";

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event);
    const runtimeConfig = useRuntimeConfig();
    const response = await $fetch<
        ApiResponse<{
            account_id: string;
        }>
    >(`${runtimeConfig.public.apiURL}/auth/login`, {
        method: "POST",
        body: formData,
        ignoreResponseError: true,
    });

    if (response.success) {
        const accountId = response.data!.account_id;
        const session = await lucia.createSession(accountId, {});
        appendHeader(
            event,
            "Set-Cookie",
            lucia.createSessionCookie(session.id).serialize()
        );
    }

    return response;
});
