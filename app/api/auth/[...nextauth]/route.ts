import NextAuth from "next-auth";
import { authOptions } from "@/lib/session";
import type { NextApiRequest, NextApiResponse } from "next/types";

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await NextAuth(req, res, authOptions);
// }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
