import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/utils/db";

import User from "../../../models/User";
import bcrypt from "bcrypt";

export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        await db.connectDb();
        const user = await User.findOne({ email });
        if (user) {
          if (!user.emailVerified) {
            await db.disconnectDb();
            throw new Error(
              "Vui lòng kích hoạt tài khoản của bạn bằng link kích hoạt gửi qua email."
            );
          } else {
            await db.disconnectDb();
            return signInUser({ password, user });
          }
        } else {
          await db.disconnectDb();
          throw new Error("Tài khoản không tồn tại trong hệ thống.");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Handle initial sign in
      if (account && user) {
        token.id = user.id;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.emailVerified = token.emailVerified;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const email = profile.email;
        await db.connectDb();
        let existingUser = await User.findOne({ email });

        if (!existingUser) {
          existingUser = await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            googleId: profile.sub,
            emailVerified: true,
            // password: null, // Password not needed for OAuth users
          });
        }
        await db.disconnectDb();
        user.id = existingUser._id.toString();
        user.emailVerified = existingUser.emailVerified;
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);

export const signInUser = async ({ password, user }) => {
  if (!password) {
    throw new Error("Vui lòng nhập mật khẩu.");
  }
  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error("Email hoặc mật khẩu không chính xác!");
  } else {
    return user;
  }
};
