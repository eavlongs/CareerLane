import { OAuth2RequestError } from "arctic";
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
        console.log(1);
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });
        console.log(2);
        const githubUser: GitHubUser = await githubUserResponse.json();
        // console.log(githubUser);
        const response = await fetch(
            `${runtimeConfig.public.apiURL}/login/provider`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    provider: 1,
                    provider_id: githubUser.id,
                    email: githubUser.login,
                    first_name: githubUser.first_name,
                    last_name: null,
                    avatar_url: githubUser.avatar_url,
                }),
            }
        );
        console.log(3);
        const json = await response.json();
        console.log(4);
        console.log(JSON.stringify(json));
        const accountId = json.data.account_id;
        console.log(accountId);

        const session = await lucia.createSession(accountId, {});
        appendHeader(
            event,
            "Set-Cookie",
            lucia.createSessionCookie(session.id).serialize()
        );
        console.log(5);
        return sendRedirect(event, "/");
    } catch (e) {
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
    login: string;
    first_name: string;
    avatar_url: string;
}
