import React, { ReactNode } from 'react'
type FormWrapperProps={
    title:string,
    children:ReactNode
}
export default function FormWrapper({title,children}:FormWrapperProps) {
  return (
    <div className='max-w-md'>
    <h1 className='text-xl font-bold mb-3'>{title}</h1>
    <div className='mb-3'>
        {children}
    </div>
    </div>
  )
}
