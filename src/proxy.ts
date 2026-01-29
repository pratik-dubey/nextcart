// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "./auth";

// export async function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl;


//   if (pathname === "/api/user/stripe/webhook") {
//     return NextResponse.next();
//   }

//   if (pathname.startsWith("/api/socket")) {
//     return NextResponse.next();
//   }
  
//   if (pathname.startsWith("/api/chat")) {
//     return NextResponse.next();
//   }
  

//   const publicRoutes = [
//     "/auth/signin",
//     "/auth/signup",
//     "/api/auth",
//     "/_next",
//     "/favicon.ico",
//   ];

//   if (publicRoutes.some((path) => pathname.startsWith(path))) {
//     return NextResponse.next();
//   }

// //  const session = await auth()
// const hasSessionCookie =
//   req.cookies.has("__Secure-next-auth.session-token") ||
//   req.cookies.has("next-auth.session-token");

// const session = hasSessionCookie ? await auth() : null;
//   // if (!session) {
//   //   const loginUrl = new URL("/auth/signin", req.url);
//   //   loginUrl.searchParams.set("callbackUrl", req.url);
//   //   return NextResponse.redirect(loginUrl);
//   // }
//   if (!session && pathname !== "/") {
//     const loginUrl = new URL("/auth/signin", req.url);
//     loginUrl.searchParams.set("callbackUrl", req.url);
//     return NextResponse.redirect(loginUrl);
//   }
  
//   const role = session?.user?.role

//   if (pathname.startsWith("/user") && role !== "user") {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }
//   if (pathname.startsWith("/delivery") && role !== "deliveryBoy") {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }
//   if (pathname.startsWith("/admin") && role !== "admin") {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!api/auth|api/user/stripe/webhook|auth|_next/static|_next/image|favicon.ico).*)",
//   ],
// };








import { NextRequest, NextResponse } from "next/server";

export async function proxy(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
