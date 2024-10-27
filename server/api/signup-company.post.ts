import { ApiResponse } from "~/utils/types";

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event);
    const runtimeConfig = useRuntimeConfig();
    const response = await $fetch<
        ApiResponse<{
            account_id: string;
        }>
    >(`${runtimeConfig.public.apiURL}/auth/register-company`, {
        method: "POST",
        body: formData,
        ignoreResponseError: true,
    });

    console.log(response);
    if (response.success) {
        const accountId = response.data!.account_id;
        const session = await lucia.createSession(accountId, {});
        console.log(1);
        appendHeader(
            event,
            "Set-Cookie",
            lucia.createSessionCookie(session.id).serialize()
        );
        console.log(2);
    }

    return response;
});
