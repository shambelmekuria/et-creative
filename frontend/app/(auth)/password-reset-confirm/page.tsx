"use client";
import { useEffect } from "react";
import PasswordResetConfirm from "@/components/auth/password-reset-confirm";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const uid = params.get("uid") ?? "";
  const token = params.get("token") ?? "";
  if (uid == "" && token == "") return router.push("/unauthorized/");
  // Update title dynamically in the client
  useEffect(() => {
    document.title = "Password Reset Confirm";
  }, []);

  return <PasswordResetConfirm uid={uid} token={token} />;
}
