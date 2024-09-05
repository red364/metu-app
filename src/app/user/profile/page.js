// src/app/user/profile/page.js

'use client' // Esto marca el componente como un componente de cliente

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '../../../components/ProtectedRoute'

const ProfilePage = () => {
 const [user, setUser] = useState(null)
 const router = useRouter()

 useEffect(() => {
  const fetchUser = async () => {
   const token = localStorage.getItem('token')

   if (!token) {
    router.push('/auth/login') // Redirigir a la página de inicio de sesión si no hay token
    return
   }

   try {
    // Cambia la URL a tu endpoint en Clever Cloud
    const res = await fetch(
     'https://tu-endpoint-en-clever-cloud/api/users/me',
     {
      headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    )

    if (res.ok) {
     const data = await res.json()
     setUser(data)
    } else {
     router.push('/auth/login') // Redirigir a la página de inicio de sesión si no se encuentra el usuario
    }
   } catch (error) {
    console.error('Error fetching user:', error)
    router.push('/auth/login') // Redirigir a la página de inicio de sesión en caso de error
   }
  }

  fetchUser()
 }, [router])

 const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/') // Redirigir a la página de inicio después de cerrar sesión
 }

 if (!user) {
  return <p>Cargando...</p>
 }

 return (
  <ProtectedRoute>
   <div className='flex justify-center items-center h-screen'>
    <div className='bg-white p-6 rounded shadow-md w-96'>
     <h2 className='text-2xl font-bold mb-4'>Perfil</h2>
     <div className='mb-4'>
      <h3 className='text-lg font-semibold'>{user.username}</h3>
      <p className='text-gray-500'>{user.email}</p>
     </div>
     <button
      onClick={handleLogout}
      className='mt-4 w-full bg-red-500 text-white py-2 px-4 rounded'
     >
      Cerrar sesión
     </button>
    </div>
   </div>
  </ProtectedRoute>
 )
}

export default ProfilePage
