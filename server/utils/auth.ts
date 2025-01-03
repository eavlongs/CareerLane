import { Lucia } from "lucia";
import { UserTypeEnum } from "~/utils/types";
import CustomAdapter from "./CustomAdapter";

const customAdapter = new CustomAdapter();
export const lucia = new Lucia(customAdapter, {
    sessionCookie: {
        attributes: {
            secure: process.env.NODE_ENV === "production",
        },
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            id: attributes.id,
            account_id: attributes.account_id,
            avatar_url: attributes.avatar_url,
            provider_id: attributes.provider_id,
            role: attributes.role,
            name:
                attributes.role === UserTypeEnum.User
                    ? `${attributes.first_name}${
                          attributes.last_name ? " " + attributes.last_name : ""
                      }`
                    : attributes.company_name,
            providers_linked: attributes.providers_linked,
            is_verified: attributes.is_verified,
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
    id: string;
    account_id: string;
    avatar_url: string | null;
    role: UserTypeEnum.User | UserTypeEnum.Company;
    first_name?: string;
    last_name?: string;
    company_name?: string;
    providers_linked?: number[];
    provider_id: string;
    is_verified?: boolean;
}
