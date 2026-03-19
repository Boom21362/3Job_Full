import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogIn";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // 1. Call your library function
        const response = await userLogin(credentials.email, credentials.password);

        // DEBUG: Check your VS Code Terminal to see the actual structure
       console.log("DEBUG: Backend returned:", response)

        // 2. Handle the "data" wrapper (Common in Vercel/Express backends)
        if (response && response.data) {
          const user = response.data;
          return {
            ...user,
            id: user._id || user.id, // NextAuth MUST have 'id'
          };
        }

        // 3. Handle direct response (If backend doesn't use a 'data' wrapper)
        if (response && (response._id || response.id)) {
          return {
            ...response,
            id: response._id || response.id,
          };
        }

        // If we reach here, credentials were wrong or structure was invalid
        return null; 
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    // error: '/auth/signin', // Optional: redirects back to signin on error
  },
  session: { 
    strategy: "jwt" 
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user is just logged in, attach their data to the token
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      // Pass all token data (id, role, etc.) into the session
      session.user = token as any;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };