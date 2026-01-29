import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "./models/user.model";
import bcrypt from "bcryptjs";
import connectDb from "./lib/db";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        await connectDb();
        const normalizedEmail = credentials.email;
        const password = credentials.password as string | undefined;

        if (!normalizedEmail || !password) {
          return null;
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
          return null;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == "google") {
        await connectDb();
        let dbUser = await User.findOne({ email: user.email });
        if (!dbUser) {
          dbUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        } else if (!dbUser.image && user.image) {
          // अगर पुराना यूज़र बिना image के है तो Google से मिली image सेव कर दें
          dbUser.image = user.image;
          await dbUser.save();
        }

        user.id = dbUser._id.toString();
        user.role = dbUser.role;
        user.image = dbUser.image || user.image;
      }
      return true;
    },
    /// ab jo jwt next auth automatically create karega usme hum user ki details dalenge in callbacks
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      if (trigger == "update") {
        token.role = session.role;
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
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60, // seconds,
  },
});
