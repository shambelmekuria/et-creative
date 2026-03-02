import { Button } from '@/components/ui/button'
import { ArrowUpRightIcon } from 'lucide-react'

export default function CTA() {
  return (
    <div className='bg-purple-600 text-white  min-h-40 py-12 px-8 text-center my-24'>
        <div className='flex flex-col gap-4 max-w-md mx-auto w-full'>
            <h1  className='font-bold text-2xl md:text-4xl'>Join Our Telegram Community</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            <div>
                <Button size="lg" className='bg-white text-black rounded-sm hover:bg-neutral-100'>Visit Now <ArrowUpRightIcon data-icon="inline-end" />  </Button>
            </div>
        </div>
    </div>
  )
}
