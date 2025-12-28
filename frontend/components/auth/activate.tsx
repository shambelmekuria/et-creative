"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DJANGO_BASE_URL } from "@/config/defualt";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import axios from "axios";

type ActivateProps = {
  uid: string;
  token: string;
};
export default function Activate({
  uid,
  token,
}: ActivateProps) {
  const [error, setError] = useState("");
  const router = useRouter()
  const handleActivate = async () => {
    try {
      const res = await axios.post(`${DJANGO_BASE_URL}/api/users/activate/`, { uid: uid, token: token });
      if (res) {
        router.push('/activate/success')
      }

    }
    catch (error: any) {
      setError(error.response.data.message)
    }
  }
  return (
    <div className='min-h-screen flex justify-center items-center '>

      <Card className='rounded w-full max-w-sm  mx-4'>
        <CardHeader>
          <div className='flex flex-col items-center space-y-2'>
            {error ? <div className='h-16 w-16  p-4 rounded-full bg-amber-200 text-amber-800 flex justify-center items-center'>
              <Lock size={40} />
            </div> : <div className='h-16 w-16  p-4 rounded-full bg-blue-200 text-blue-600 flex justify-center items-center'>
              <Lock size={40} />
            </div>}


            {error ? <CardTitle className="font-semibold text-lg text-amber-700">Activation Failed</CardTitle> : <CardTitle className="font-semibold text-lg">Activate Account</CardTitle>}
          </div>
          {error ?
            <CardDescription className="text-center">
              {error}
            </CardDescription> :
            <CardDescription className="text-center">
              Your account has been created. Please check your email to activate it.
            </CardDescription>}
        </CardHeader>
        <CardFooter className="flex items-center justify-center">
          {error ? <Button className="h-10 bg-blue-500 hover:bg-blue-600 w-48" onClick={() => router.push('/login')}>
            Go to Login
          </Button> :
            <Button className="h-10 bg-blue-500 hover:bg-blue-600 w-48" onClick={handleActivate}>
              Activate Account
            </Button>}
        </CardFooter>
      </Card>
    </div>
  );
}
