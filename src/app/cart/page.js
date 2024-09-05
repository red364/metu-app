'use client'

import { useEffect, useState } from 'react'

const CartPage = () => {
 const [cart, setCart] = useState([])

 useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || []
  setCart(storedCart)
 }, [])

 const removeFromCart = (productId) => {
  const updatedCart = cart.filter((item) => item.id !== productId)
  setCart(updatedCart)
  localStorage.setItem('cart', JSON.stringify(updatedCart))
 }

 const handleCheckout = () => {
  const totalAmount = cart.reduce(
   (total, item) => total + item.attributes.price,
   0
  )

  // Redirige a PayPal con los detalles del pago
  const businessEmail = 'danger117rq@gmail.com' // Cambia esto por tu email de PayPal
  const returnUrl = 'http://localhost:3000/thank-you'
  const cancelUrl = 'http://localhost:3000/cancel'
  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${businessEmail}&item_name=Cart%20Purchase&amount=${totalAmount}&currency_code=USD&return=${returnUrl}&cancel_return=${cancelUrl}`

  window.location.href = paypalUrl
 }

 return (
  <div className='p-4'>
   <h1 className='text-2xl font-bold'>Carro de la compra</h1>
   {cart.length > 0 ? (
    <div className='flex flex-wrap gap-4'>
     {cart.map((product) => (
      <div key={product.id} className='p-4 border rounded flex-shrink-0'>
       {product.attributes.Image &&
       product.attributes.Image.data &&
       product.attributes.Image.data[0].attributes &&
       product.attributes.Image.data[0].attributes.url ? (
        <img
         src={`http://localhost:1337${product.attributes.Image.data[0].attributes.url}`}
         alt={product.attributes.name}
         className='w-auto h-50 max-w-full object-cover mt-4 mx-auto'
        />
       ) : null}
       <h2 className='text-xl font-semibold mt-2 text-center'>
        {product.attributes.name}
       </h2>
       <p className='mt-2 text-center'>${product.attributes.price}</p>
       <button
        onClick={() => removeFromCart(product.id)}
        className='mt-2 bg-red-500 text-white py-1 px-4 rounded block mx-auto'
       >
        Remover
       </button>
      </div>
     ))}
    </div>
   ) : (
    <p>Su carrito está vacío.</p>
   )}
   <button
    onClick={handleCheckout}
    className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
   >
    Pagar con PayPal
   </button>
  </div>
 )
}

export default CartPage
