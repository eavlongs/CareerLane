import { OAuth2RequestError } from "arctic";
import { facebook } from "~/server/utils/arctic";
import { ProviderTypeEnum } from "~/utils/types";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const code = query.code?.toString() ?? null;
    const state = query.state?.toString() ?? null;
    console.log("Heere");
    const storedState = getCookie(event, "facebook_oauth_state") ?? null;
    if (!code || !state || !storedState || state !== storedState) {
        throw createError({
            status: 400,
        });
    }
    console.log(2);
    try {
        const tokens = await facebook.validateAuthorizationCode(code);
        const url = new URL("https://graph.facebook.com/me");
        url.searchParams.set("access_token", tokens.accessToken);
        url.searchParams.set(
            "fields",
            ["id", "name", "picture", "email"].join(",")
        );
        const facebookResponse = await fetch(url);
        const faceBookUser: FacebookUser = await facebookResponse.json();
        console.log(faceBookUser);
        const runtimeConfig = useRuntimeConfig();
        console.log(1);
        const response = await fetch(
            `${runtimeConfig.public.apiURL}/login/provider`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    provider: ProviderTypeEnum.FACEBOOK,
                    provider_id: faceBookUser.id,
                    first_name: faceBookUser.name,
                    avatar_url: faceBookUser.picture.data.url,
                }),
            }
        );
        const json = await response.json();
        console.log(json);
        const accountId = json.data.account_id;

        const session = await lucia.createSession(accountId, {});
        appendHeader(
            event,
            "Set-Cookie",
            lucia.createSessionCookie(session.id).serialize()
        );
        deleteCookie(event, "facebook_oauth_state");
        return sendRedirect(event, "/");
    } catch (e: any) {
        console.log(e.message);
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

interface FacebookUser {
    id: string;
    name: string;
    picture: {
        data: {
            url: string;
        };
    };
}
