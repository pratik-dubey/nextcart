import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "./models/user.model";
import { error } from "console";
import bcrypt from "bcryptjs";
import connectDb from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectDb();
        const email = credentials.email;
        const password = credentials.password as string;

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User does not exists !");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    /// ab jo jwt next auth automatically create karega usme hum user ki details dalenge in callbacks
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user.id = token.id as string),
          (session.user.name = token.name as string),
          (session.user.email = token.email as string);
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  },
});
