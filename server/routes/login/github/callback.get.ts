import { OAuth2RequestError } from "arctic";
import { linkAccount } from "~/utils/helper";
import { ProviderTypeEnum } from "~/utils/types";
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const code = query.code?.toString() ?? null;
    const state = query.state?.toString() ?? null;
    const storedState = getCookie(event, "github_oauth_state") ?? null;
    if (!code || !state || !storedState || state !== storedState) {
        throw createError({
            status: 400,
        });
    }

    try {
        const runtimeConfig = useRuntimeConfig();
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });
        const githubUser: GitHubUser = await githubUserResponse.json();

        deleteCookie(event, "github_oauth_state");

        const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;
        const redirectUrl = await linkAccount(sessionId, {
            provider: ProviderTypeEnum.GITHUB,
            provider_id: githubUser.id.toString(),
            provider_account_profile: githubUser.html_url,
        });

        if (redirectUrl.length > 0) {
            return sendRedirect(event, redirectUrl);
        }

        const response = await fetch(
            `${runtimeConfig.public.apiURL}/auth/login/provider`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    provider: ProviderTypeEnum.GITHUB,
                    provider_id: githubUser.id.toString(),
                    provider_account_profile: githubUser.html_url,
                    avatar_url: githubUser.avatar_url,
                    first_name: githubUser.name
                        ? githubUser.name
                        : githubUser.login,
                }),
            }
        );
        const json = await response.json();

        const accountId = json.data.account_id;

        const session = await lucia.createSession(accountId, {});
        if (!session) {
            throw createError({
                status: 500,
            });
        }
        appendHeader(
            event,
            "Set-Cookie",
            lucia.createSessionCookie(session.id).serialize()
        );
        deleteCookie(event, "github_oauth_state");
        return sendRedirect(event, "/");
    } catch (e) {
        console.log(e);
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

interface GitHubUser {
    id: string;
    avatar_url: string;
    provider: number;
    provider_id: string;
    name: string;
    html_url: string;
    login: string;
}
