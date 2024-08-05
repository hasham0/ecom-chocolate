import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      // console.log(" --------------------------------------------------");
      // console.log("file: middleware.ts:6  authorized  token => ", token);
      // console.log(" --------------------------------------------------");
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin";
      } else {
        return true;
      }
    },
  },
});

export const config = {
  matcher: ["/admin(/.*)?"],
};
