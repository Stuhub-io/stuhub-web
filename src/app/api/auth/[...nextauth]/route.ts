import NextAuth from "next-auth"
import { uuidv7 } from "uuidv7"

const handler = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        generateSessionToken() {
            return uuidv7()
        },
    },
    providers: [

    ]
})

export { handler as GET, handler as POST }