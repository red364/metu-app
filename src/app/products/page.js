'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const ProductsPage = () => {
 const [products, setProducts] = useState([])
 const [searchTerm, setSearchTerm] = useState('')

 useEffect(() => {
  const fetchProducts = async () => {
   try {
    // Se ha añadido pagination[limit] para obtener más productos (por ejemplo, 100)
    const res = await fetch(
     'http://localhost:1337/api/products?populate=*&pagination[limit]=100'
    )
    const data = await res.json()
    console.log(data) // Esto te permitirá ver los datos recibidos
    setProducts(data.data || [])
   } catch (error) {
    console.error('Error fetching products:', error)
    setProducts([])
   }
  }

  fetchProducts()
 }, [])

 const addToCart = (product) => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || []
  const updatedCart = [...storedCart, product]
  localStorage.setItem('cart', JSON.stringify(updatedCart))
 }

 // Filtrar los productos en función del término de búsqueda
 const filteredProducts = products.filter((product) =>
  product.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
 )

 return (
  <div className='p-4'>
   <h1 className='text-2xl font-bold'>Productos</h1>

   {/* Barra de búsqueda */}
   <input
    type='text'
    placeholder='Buscar producto...'
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className='mt-4 p-2 border rounded w-full'
   />

   <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
    {filteredProducts.length > 0 ? (
     filteredProducts.map((product) => (
      <div key={product.id} className='border p-4 cursor-pointer'>
       {product.attributes.Image &&
       product.attributes.Image.data &&
       product.attributes.Image.data[0].attributes &&
       product.attributes.Image.data[0].attributes.url ? (
        <img
         src={`http://localhost:1337${product.attributes.Image.data[0].attributes.url}`}
         alt={product.attributes.name}
         className='w-auto h-48 max-w-full object-cover mt-4 mx-auto'
        />
       ) : (
        <div className='w-full h-48 bg-gray-200 flex items-center justify-center'>
         No Imagen
        </div>
       )}
       <h2 className='text-xl font-semibold mt-2'>{product.attributes.name}</h2>
       <p className='mt-2'>${product.attributes.price}</p>
       <Link href={`/products/${product.id}`}>
        <button className='mt-2 bg-blue-500 text-white py-1 px-4 rounded'>
         Ver detalles
        </button>
       </Link>
       <button
        onClick={() => addToCart(product)}
        className='mt-2 bg-green-500 text-white py-1 px-4 rounded'
       >
        Añadir al carro
       </button>
      </div>
     ))
    ) : (
     <p>No hay productos válidos.</p>
    )}
   </div>
  </div>
 )
}

export default ProductsPage
