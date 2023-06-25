import { getServerSession } from "next-auth/next";
import type { NextAuthOptions, User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt"
import jsonwebtoken from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    })
  ],
  jwt: {
    encode: ({ secret, token }) => {

    },
    decode: async ({ secret, token }) => {

    }
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.png"
  },
  callbacks: {
    async session({ session }) {

    },
    async signIn({ user }) {
      
    }
  }
}