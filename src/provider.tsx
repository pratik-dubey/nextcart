"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

// we have passed all the children through session provider of next auth to provide them session created by next auth and we cannot use "use client" with metadata in layout.tsx so we wrote the logic here and wrapped children in layput.tsx with Provider
function Provider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;
