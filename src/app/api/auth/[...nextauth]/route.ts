import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { GOOGLE_ID, GOOGLE_SECRET } from "@/constants/envs"


const handler = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials, ) => {
                // FIXME: Implement credentials validation with own APIs

                console.log({credentials})
                return {
                    id: '1',
                    name: 'John Doe',
                    email: 'example@gmail.com',
                }
            },
        })
    ],
    callbacks: {
        signIn: async ({user, account, profile, email, credentials}) => {
            setTimeout(() => {
            console.log("\n\n\n\n\n")
                console.log({user, account, profile, email, credentials})
            console.log("\n\n\n\n\n")
            }, 1000)
            if (credentials) {
                return true
            }

            // FIXME: Handling Google Sign in here
            return true
        }
    }
})

export { handler as GET, handler as POST }