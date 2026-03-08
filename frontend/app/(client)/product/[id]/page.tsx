import React from 'react'

type Props = {
    params: Promise<{ id: string }>
}
export default async function ProductDetailPage({ params }: Props) {
    const product_id = (await params).id
    return (
        <div>ProductDetailPage {product_id}</div>
    )
}
