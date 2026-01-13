// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function proxy(req: NextRequest) {
//   //     req.url = RAW URL string (full address in one line)
//   // req.nextUrl = Parsed Next.js URL object (address broken into parts)

//   const { pathname } = req.nextUrl;
//   //   console.log(pathname);
//   const publicRoutes = [
//     "/auth/signin",
//     "/auth/signup",
//     "/api/auth",
//     "/_next",
//     "/favicon.ico",
//   ];
//   //   console.log(req.url);
//   if (publicRoutes.some((path) => pathname.startsWith(path))) {
//     return NextResponse.next();
//   }
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET });
//   if (!token) {
//     //       And when you pass a relative path ("/auth/signin") to new URL(),
//     // it ALWAYS attaches it to the origin, NOT to the path.
//     const loginUrl = new URL("/auth/signin", req.url);
//     loginUrl.searchParams.set("callbackUrl", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   const role = token.role;
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

// // The routes you mention inside (?! ... ) are totally ignored by middleware.
// export const config = {
//   matcher: "/((?!api/auth|auth|_next/static|_next/image|favicon.ico).*)",
// };








import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;


  if (pathname === "/api/user/stripe/webhook") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/socket")) {
    return NextResponse.next();
  }
  

  const publicRoutes = [
    "/auth/signin",
    "/auth/signup",
    "/api/auth",
    "/_next",
    "/favicon.ico",
  ];

  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/auth/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role;

  if (pathname.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (pathname.startsWith("/delivery") && role !== "deliveryBoy") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|api/user/stripe/webhook|auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
