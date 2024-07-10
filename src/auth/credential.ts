import { authService } from "@/api";

const credentialConfig = {
  id: "credentials-signin",
  name: "credentials",
  credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
  },
  authorize: async (credentials?: {email: string, password: string}) => {
    if (!credentials?.email || !credentials.password) return null
    try {
      const {data: {profile, tokens: {access}}} = await authService.authWithEmailPassword({
        email: credentials.email,
        password: credentials.password,
      });
      return {
        ...profile,
        accessToken: access,
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }, 
};

const authHandler = (ctx: any) => {
  if (ctx.user.accessToken) return true
  return false
}

const getUserProfileByToken = async ({user}: {user: any}) => {
  const { data: profile } = await authService.getUserProfileByToken({accessToken: user.accessToken});
  return {
    ...profile,
    accessToken: user.accessToken,
  };
};

export const CredentialAuth = {
  signinConfig: credentialConfig,
  handle: authHandler,
  getProfile: getUserProfileByToken,
  isCredentialProvider: (providerId: string) => providerId === credentialConfig.id,
}
