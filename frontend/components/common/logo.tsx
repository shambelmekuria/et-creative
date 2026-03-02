import { Computer } from 'lucide-react'
import React from 'react'

export default function Logo() {
  return (
    <div className='font-bold text-lg  uppercase flex items-center gap-2'>
        <Computer className='text-white bg-linear-to-r from-blue-500 to-purple-500 h-8 w-8 rounded-md p-1' size={16}/> ET Creative
    </div>
  )
}
