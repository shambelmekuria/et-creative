'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter()
  return (
    <div className="h-screen flex items-center justify-center p-6 md:10">
      <div className="max-w-sm">
        <Card className="rounded p-0 h-90">
          <div className="space-y-4">
           <div className="bg-green-500 text-white space-y-3 h-1/2 flex justify-center items-center">
             <div className="flex flex-col items-center space-y-3">
              <Check size={40}  className="h-16 w-16 rounded-full border-4 border-slate-50 "/>
            <h1 className="text-xl font-semibold"> Password reset successful</h1>
             </div>
           </div>
           <div className="p-10 space-y-3">
             <p className="text-sm text-center"> You can now use your new password to login to your account</p>
            <Button className="h-10  w-full bg-green-500 hover:bg-green-600" onClick={() => router.push('/login')}>Login </Button>
           </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Page;