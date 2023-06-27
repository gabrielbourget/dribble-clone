import { getServerSession } from "next-auth/next";
import type { NextAuthOptions, User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt"
import jsonwebtoken from "jsonwebtoken";
import { SessionInterface, UserProfile } from "@/common.types";
import { createuser, getUser } from "./actions";

const {
  GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
} = process.env;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: GITHUB_CLIENT_ID!,
      clientSecret: GITHUB_CLIENT_SECRET!,
    })
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.png"
  },
  callbacks: {
    async session({ session }) {
      console.log(`session from next-auth session callback -> ${session}`);

      const email = session?.user?.email as string;

      try {
        const data = await getUser(email) as { user?: UserProfile }

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user
          }
        };

        return newSession;
      } catch(err) {
        console.error(`Error in next-auth session callback -> ${err}`);
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      console.log(`user in next auth signIn callback -> ${JSON.stringify(user, null, 3)}`);
      try {
        const userQueryRes = await getUser(user?.email as string) as { user?: UserProfile };
        
        console.log(`user query request -> ${JSON.stringify(userQueryRes, null, 3)}`);

        if (!userQueryRes.user) {
          await createuser(user.name as string, user.email as string, user.image as string);
        }

        return true;
      } catch (err) {
        console.log(`err in signIn function -> ${err}`) ;
        return false;
      }
    }
  }
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions) as SessionInterface;
  console.log(`session from getServerSession call -> ${session}`);
  return session;
};
