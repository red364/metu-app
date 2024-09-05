// src/app/layout.js
import '../styles/globals.css'
import Link from 'next/link'

export default function RootLayout({ children }) {
 return (
  <html lang='en'>
   <body>
    <header className='p-4 bg-gray-800 text-white flex justify-between items-center'>
     <h1 className='text-xl font-bold'>Metu</h1>
     <nav>
      <Link href='/' className='mr-4'>
       Inicio
      </Link>
      <Link href='/products' className='mr-4'>
       Productos
      </Link>
      <Link href='/cart' className='mr-4'>
       Carrito
      </Link>
      <Link href='/contact' className='mr-4'>
       Contacto
      </Link>
      <Link href='/auth/register' className='mr-4'>
       Registro
      </Link>
      <Link href='/user/profile'>Perfil</Link>
     </nav>
    </header>
    {children}
   </body>
  </html>
 )
}
