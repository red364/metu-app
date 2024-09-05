// src/app/order/success/page.js
'use client'

import Link from 'next/link'

const OrderSuccessPage = () => {
 return (
  <div className='p-4'>
   <h1 className='text-2xl font-bold'>Order Success!</h1>
   <p>Your order has been successfully placed.</p>
   <Link href='/'>
    <a className='text-blue-500'>Go back to home</a>
   </Link>
  </div>
 )
}

export default OrderSuccessPage
