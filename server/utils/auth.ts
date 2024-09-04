import { Lucia } from "lucia";
import CustomAdapter from "./CustomAdapter";

const customAdapter = new CustomAdapter();
export const lucia = new Lucia(customAdapter, {
    sessionCookie: {
        attributes: {
            secure: !import.meta.dev,
        },
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            firstName: attributes.firstName,
            lastName: attributes.lastName,
            aboutMe: attributes.aboutMe,
            jobTitle: attributes.jobTitle,
        };
    },
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    firstName: string;
    lastName: string;
    email: string;
    aboutMe: string;
    jobTitle: string;
    providerType: string;
    providerId: string;
}
