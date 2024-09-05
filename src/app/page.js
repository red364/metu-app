'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const HomePage = () => {
 const [products, setProducts] = useState([])

 useEffect(() => {
  const fetchProducts = async () => {
   try {
    const res = await fetch('http://localhost:1337/api/products?populate=*')
    const data = await res.json()
    setProducts(data.data || [])
   } catch (error) {
    console.error('Error fetching products:', error)
    setProducts([])
   }
  }

  fetchProducts()
 }, [])

 const categories = {
  trabajos: [],
  tecnologia: [],
  gamer: [],
  accesorios: [],
  cremas: [],
 }

 products.forEach((product) => {
  const categoryData = product.attributes.category?.data
  if (categoryData) {
   const category = categoryData.attributes.name.toLowerCase()
   if (categories[category]) {
    categories[category].push(product)
   }
  }
 })

 return (
  <div className='p-4'>
   <h1 className='text-2xl font-bold'>Productos de Rezer</h1>

   {/* Sección para mostrar 9 productos */}
   <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
    {products.slice(0, 6).map((product) => (
     <Link key={product.id} href={`/products/${product.id}`}>
      <div className='border p-4 cursor-pointer'>
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
      </div>
     </Link>
    ))}
   </div>

   {/* Sección de video de YouTube con reproducción automática */}
   <div className='mt-8'>
    <h2 className='text-xl font-bold'>Video de Publicitario de Rezer</h2>
    <div className='mt-4'>
     <iframe
      width='100%'
      height='500'
      src='https://www.youtube.com/embed/hh0aJusncI0?autoplay=1&mute=1'
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      title='Video de Presentación'
     ></iframe>
    </div>
   </div>

   {/* Sección para leer un PDF */}
   <div className='mt-8'>
    <h2 className='text-xl font-bold'>Política de Términos y Condiciones</h2>
    <div className='mt-4'>
     <iframe
      src='/material/Politicas.pdf'
      width='100%'
      height='500px'
      className='border'
     >
      Este navegador no soporta la lectura de PDF.
     </iframe>
    </div>
   </div>
  </div>
 )
}

export default HomePage
