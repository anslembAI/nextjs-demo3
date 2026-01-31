import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    // Call the Convex mutation to sign in and get a session token
                    const result = await fetchMutation(api.passwordAuth.signIn, {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    if (result && result.userId) {
                        return {
                            id: result.userId,
                            name: result.name,
                            email: result.email,
                            sessionToken: result.sessionToken, // Pass custom token to session
                        };
                    }
                    return null;
                } catch (e) {
                    console.error("Auth error:", e);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.sessionToken = (user as any).sessionToken;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).sessionToken = token.sessionToken;
            }
            return session;
        },
    },
    pages: {
        signIn: "/", // We use a modal, so redirect to home if forced
    },
    session: {
        strategy: "jwt",
    },
};
