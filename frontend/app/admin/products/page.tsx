import React from 'react'
import { ProductDataTable } from './data-table'
import { columns} from './columns'
import { fetchProduct } from '@/actions/product'
import { Product, ProductResponse } from '@/types/products'

 export default async function Page() {
  const data:ProductResponse = await fetchProduct()
  return (
    <div>
      <ProductDataTable columns={columns} data={data} />
    </div>
  )
}
