"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BadgeCheck, Check, Lock, ShieldCheck } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
export default function Page() {
    const router = useRouter()
  return (
    <div className='min-h-screen flex justify-center items-center '>

      <Card className='rounded w-full max-w-sm  mx-4'>
        <CardHeader>
          <div className='flex flex-col items-center space-y-2'>
           <div className='h-16 w-16  p-4 rounded-full bg-blue-200 text-blue-600 flex justify-center items-center'>
              <ShieldCheck size={60} />
            </div>
           <CardTitle className="font-semibold text-lg">Activation Successful</CardTitle> 
          </div>
         
            <CardDescription className="text-center">
               Your account has been successfully activated.
            </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-center">
            <Button className="h-10 bg-blue-500 hover:bg-blue-600 w-48" onClick={()=>router.push('/login')}>
              Login
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
