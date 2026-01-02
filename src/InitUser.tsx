"use client";

import { useSession } from "next-auth/react";
import useGetMe from "./hooks/useGetMe";

function InitUser() {
  const { status } = useSession();

  // ✅ hook always called
  useGetMe();

  return null;
}

export default InitUser;
