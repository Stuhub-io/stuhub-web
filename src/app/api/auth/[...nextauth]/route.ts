import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { GoogleAuth } from "@/auth"
import { CredentialAuth } from "@/auth/credential"
import { authService } from "@/api"


const handler = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider(GoogleAuth.signinConfig),
        CredentialsProvider(CredentialAuth.signinConfig)
    ],
    callbacks: {
        signIn: async ({user, account, }) => {
            try {
                // NOTE: Oauths handle method should return 
                if (GoogleAuth.isGoogleProvider(account?.provider ?? "")) {
                    return GoogleAuth.handle({ account })
                }
                if (CredentialAuth.isCredentialProvider(account?.provider ?? "")) {
                    return CredentialAuth.handle({ user })
                }
                return false
            }
            catch(err) {
                return false
            }
        },
        jwt: async ({token, user, account}) => {

            // NOTE: First Signin in -> Include accessToken, profile in JWT
            if (account) {
                try {
                if (GoogleAuth.isGoogleProvider(account.provider)) {
                    // Exchange Google Token for Backend new Tokens
                    // include user profile, accessToken
                    return GoogleAuth.getProfile({ account })
                }
                if (CredentialAuth.isCredentialProvider(account.provider)) {

                    // include user profile, accessToken
                    return CredentialAuth.getProfile({user})
                }
                throw new Error("no authentication provider found");
                }
                catch(err) {
                    throw new Error("error in jwt callback")
                }
            }

            // NOTE: Subsequent Auth -> Use accessToken in JWT
            const { data: profile } = await authService.getUserProfileByToken({ accessToken: token.accessToken!})
            return {
                ...profile,
                accessToken: token.accessToken,
            }
        },
        session(params) {
            const { session, token } = params;
            // NOTE: Include all user profile in session
            // @ts-expect-error Some error
            session.user = {
                ...token
            }
            return session; 
        },
    }
})

export { handler as GET, handler as POST }