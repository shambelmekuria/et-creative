import ProductForm from '@/components/forms/product-form'
import React from 'react'

export default function ProductAddPage() {
  return (
    <div>
        <h1 className='font-medium text-xl mb-3'>
            Add Product
        </h1>
        <p className='text-muted-foreground text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        <ProductForm/>
    </div>
  )
}
