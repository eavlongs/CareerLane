import { OAuth2RequestError } from "arctic";
import { google } from "~/server/utils/arctic";
import { lucia } from "~/server/utils/auth";
import { ProviderTypeEnum } from "~/utils/types";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const code = query.code?.toString() ?? null;
    const state = query.state?.toString() ?? null;
    const storedState = getCookie(event, "google_oauth_state") ?? null;
    const codeVerifier = getCookie(event, "codeVerifier") ?? null;
    if (
        !code ||
        !state ||
        !storedState ||
        state !== storedState ||
        !codeVerifier
    ) {
        throw createError({
            status: 400,
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(
            code,
            codeVerifier
        );
        const googleUserResponse = await fetch(
            "https://openidconnect.googleapis.com/v1/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            }
        );
        const runtimeConfig = useRuntimeConfig();
        const googleUser: GoogleUser = await googleUserResponse.json();
        const response = await fetch(
            `${runtimeConfig.public.apiURL}/login/provider`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    provider: ProviderTypeEnum.GOOGLE,
                    provider_id: googleUser.sub,
                    avatar_url: googleUser.picture,
                    first_name: googleUser.given_name,
                    last_name: googleUser.family_name,
                }),
            }
        );

        const json = await response.json();
        const accountId = json.data.account_id;

        const session = await lucia.createSession(accountId, {});
        appendHeader(
            event,
            "Set-Cookie",
            lucia.createSessionCookie(session.id).serialize()
        );

        // remove google_oauth_state and codeVerifier cookies
        // deleteCookie(event, "google_oauth_state");
        deleteCookie(event, "codeVerifier");
        return sendRedirect(event, "/");
    } catch (e: any) {
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            throw createError({
                status: 400,
            });
        }
        throw createError({
            status: 500,
        });
    }
});

interface GoogleUser {
    sub: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
}
