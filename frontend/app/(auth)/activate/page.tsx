"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Activate from "@/components/auth/activate"

export default function Page() {
  const params = useSearchParams()
  const uid = params.get("uid") ?? ""
  // const token = params.get("token") ?? ""
  const token = decodeURIComponent(params.get("token") ?? "");

  return <Activate uid={uid} token={token}/>
}
