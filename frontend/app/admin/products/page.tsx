import React from 'react'
import { ProductDataTable } from './data-table'
import { columns} from './columns'
import { fetchProduct } from '@/actions/product'
import { Product, ProductResponse } from '@/types/products'

 export default async function Page() {
  const data:ProductResponse = await fetchProduct()
  // const data:Product[] = await fetchProduct()
  console.log("product",data)
  return (
    <div>
      <ProductDataTable columns={columns} data={data} />
    </div>
  )
}
