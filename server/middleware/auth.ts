import { verifyRequestOrigin } from "lucia";

import type { Session, User } from "lucia";

export default defineEventHandler(async (event) => {
    console.log("server middleware");
    console.log(event.method);
    if (event.method !== "GET") {
        const originHeader = getHeader(event, "Origin") ?? null;
        // NOTE: You may need to use `X-Forwarded-Host` instead
        const hostHeader = getHeader(event, "Host") ?? null;
        if (
            !originHeader ||
            !hostHeader ||
            !verifyRequestOrigin(originHeader, [hostHeader])
        ) {
            return event.node.res.writeHead(403).end();
        }
    }

    const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;
    console.log("Lucia cookie:  " + sessionId);
    if (!sessionId) {
        event.context.session = null;
        event.context.user = null;
        return;
    }

    const { session, user } = await lucia.validateSession(sessionId);
    console.log("My session:", session);
    if (session && session.fresh) {
        appendResponseHeader(
            event,
            "Set-Cookie",
            lucia.createSessionCookie(session.id).serialize()
        );
    }
    // if (!session) {
    //     appendResponseHeader(
    //         event,
    //         "Set-Cookie",
    //         lucia.createBlankSessionCookie().serialize()
    //     );
    // }
    event.context.session = session;
    event.context.user = user;
});

declare module "h3" {
    interface H3EventContext {
        user: User | null;
        session: Session | null;
    }
}
