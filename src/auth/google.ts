import { authService } from "@/api";
import { GOOGLE_ID, GOOGLE_SECRET } from "@/constants/envs";
import { JWT } from "next-auth/jwt";

const googleSigninConfig = {
  id: "google-signin",
  name: "google",
  clientId: GOOGLE_ID,
  clientSecret: GOOGLE_SECRET,
};


const authHandler = async (ctx: any) => {
  const authType = ctx.account.provider;
  if (authType === googleSigninConfig.id) {
    try {
      await authService.googleOauth({
        token: ctx.account.access_token,
      });
      return true;
    } catch (err: any) {
    throw new Error("Google Oauth Failed");
    }
  }
  throw new Error("provider not found");
};


const getUserProfile = async ({account}: {account: any}) => {
const accessToken = account.access_token

  const {data: { tokens: { access }, profile }} = await authService.googleOauth({
    token: accessToken,
  });

  return {
    ...profile,
    accessToken: access,
  } as JWT;
};

export const GoogleAuth = {
  signinConfig: googleSigninConfig,
  handle: authHandler,
  getProfile: getUserProfile,
  isGoogleProvider: (providerId: string) => providerId === googleSigninConfig.id,
};
