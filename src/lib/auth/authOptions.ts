import GoogleProvider from "next-auth/providers/google";
import { users } from "../database/schemas/schema";
import { db } from "../database/db";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      async profile(profile, token: any) {
        // console.log(" ----------------------------------------------------");
        // console.log("file: authOptions.ts:9  profile  profile => ", profile);
        // console.log(" ----------------------------------------------------");
        // console.log(" ------------------------------------------------");
        // console.log("file: authOptions.ts:9  profile  token => ", token);
        // console.log(" ------------------------------------------------");

        const data = {
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          provider: "GOOGLE",
          externalID: profile.sub,
          image: profile.picture,
        };

        try {
          const user = await db
            .insert(users)
            .values(data)
            .onConflictDoUpdate({ target: users.email, set: data })
            .returning();
          return {
            ...data,
            name: data.firstName,
            id: String(user[0].id),
            role: user[0].role,
          };
        } catch (error) {
          console.log(" -------------------------------------------------");
          console.log("file: authOptions.ts:40  profile  error => ", error);
          console.log(" -------------------------------------------------");
          return { id: "" };
        }
      },
    }),
  ],
  callbacks: {
    session(data: any) {
      return data;
    },
    jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
  },
};

export default authOptions;
