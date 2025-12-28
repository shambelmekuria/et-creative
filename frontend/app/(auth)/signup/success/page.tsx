'use client'
import { Button } from '@/components/ui/button'
import { ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
function Page() {
    const router = useRouter()
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="rounded flex items-center justify-center">
                <div className='max-w-sm shadow h-90 '>
                    <div className='bg-green-500 h-1/2 text-white flex justify-center items-center'>
                        <div className='text-center space-y-2'>
                            <ShieldCheck className='h-16 w-16 border-4 p-3 rounded-full border-white' />
                            <h1 className='text-whiite text-xl font-bold'>Success</h1>
                        </div>

                    </div>
                    <div className='p-10 text-center space-y-3'>
                        <p >
                          Your account has been created. Please check your email to <span className='font-bold'>activate</span> it.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Page