import { Card } from "@/components/ui/card";
import { Check, ShieldCheck } from "lucide-react";
import React from "react";

function Page() {
  return (
    <section className="flex justify-center items-center min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="rounded max-w-sm shadow h-90">
        <div className="bg-green-500 h-1/2 flex flex-col items-center justify-center text-white">
          <div className="border-4 rounded-full h-16 w-16 flex items-center justify-center">
            <Check size={40}/>
          </div>
          <h1 className="text-xl font-semibold">Success</h1>
        </div>
          <div className="p-6 space-y-3 text-center">
            <h1 className="font-bold text-lg md:text-xl">Request received.</h1>
            <p className="text-xs md:text-sm">
              If an account exists with this email, password reset instructions have been sent.
            </p>
          </div>
       
      </div>
    </section>
  );
}

export default Page;
