'use client'

import { useEffect, useState } from 'react'

const ProductDetailsPage = ({ params }) => {
 const [product, setProduct] = useState(null)
 const { id } = params

 useEffect(() => {
  if (id) {
   const fetchProduct = async () => {
    try {
     const res = await fetch(
      `http://localhost:1337/api/products/${id}?populate=*`
     )
     const data = await res.json()
     setProduct(data.data)
    } catch (error) {
     console.error('Error fetching product:', error)
     setProduct(null)
    }
   }

   fetchProduct()
  }
 }, [id])

 const addToCart = (product) => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || []
  const updatedCart = [...storedCart, product]
  localStorage.setItem('cart', JSON.stringify(updatedCart))
 }

 if (!product) {
  return <p>Cargando...</p>
 }

 return (
  <div className='p-4'>
   <h1 className='text-2xl font-bold'>{product.attributes.name}</h1>
   {product.attributes.Image &&
    product.attributes.Image.data &&
    product.attributes.Image.data[0].attributes &&
    product.attributes.Image.data[0].attributes.url && (
     <img
      src={`http://localhost:1337${product.attributes.Image.data[0].attributes.url}`}
      alt={product.attributes.name}
      className='w-auto h-96 max-w-full object-cover mt-4 mx-auto'
     />
    )}
   <p className='text-xl mt-4'>${product.attributes.price}</p>
   <p className='mt-4'>{product.attributes.description}</p>
   <button
    onClick={() => addToCart(product)}
    className='mt-4 bg-green-500 text-white py-2 px-4 rounded'
   >
    Añadir al carro
   </button>
  </div>
 )
}

export default ProductDetailsPage
