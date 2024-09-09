import { Facebook, GitHub, Google } from "arctic";

export const github = new GitHub(
    process.env.GITHUB_CLIENT_ID!,
    process.env.GITHUB_CLIENT_SECRET!
);

export const google = new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.FRONTEND_URL! + "/login/google/callback"
);

export const facebook = new Facebook(
    process.env.FACEBOOK_CLIENT_ID!,
    process.env.FACEBOOK_CLIENT_SECRET!,
    process.env.FRONTEND_URL! + "/login/facebook/callback"
);
