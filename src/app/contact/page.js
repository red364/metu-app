'use client'

import { useState } from 'react'

const ContactForm = () => {
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: '',
 })
 const [status, setStatus] = useState('')

 const handleChange = (e) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.value,
  })
 }

 const handleSubmit = async (e) => {
  e.preventDefault()
  setStatus('sending')

  try {
   const res = await fetch('http://localhost:1337/api/contact-messages', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     Accept: 'application/json',
    },
    body: JSON.stringify({
     data: {
      name: formData.name,
      email: formData.email,
      message: formData.message,
     },
    }),
   })

   if (res.ok) {
    setStatus('success')
    setFormData({
     name: '',
     email: '',
     message: '',
    })
   } else {
    const errorData = await res.json()
    console.error('Error response from server:', errorData)
    setStatus('error')
   }
  } catch (error) {
   console.error('Error submitting form:', error)
   setStatus('error')
  }
 }

 return (
  <div className='p-4'>
   <h2 className='text-2xl font-bold'>Contactanos</h2>
   {status === 'success' && (
    <p className='text-green-500'>¡Mensaje enviado exitosamente!</p>
   )}
   {status === 'error' && (
    <p className='text-red-500'>Hubo un error al enviar su mensaje.</p>
   )}
   <form onSubmit={handleSubmit} className='space-y-4'>
    <div>
     <label htmlFor='name' className='block text-sm font-medium'>
      Nombre
     </label>
     <input
      type='text'
      id='name'
      name='name'
      value={formData.name}
      onChange={handleChange}
      required
      className='mt-1 p-2 border rounded w-full'
     />
    </div>
    <div>
     <label htmlFor='email' className='block text-sm font-medium'>
      Email
     </label>
     <input
      type='email'
      id='email'
      name='email'
      value={formData.email}
      onChange={handleChange}
      required
      className='mt-1 p-2 border rounded w-full'
     />
    </div>
    <div>
     <label htmlFor='message' className='block text-sm font-medium'>
      Mensaje
     </label>
     <textarea
      id='message'
      name='message'
      value={formData.message}
      onChange={handleChange}
      required
      rows='4'
      className='mt-1 p-2 border rounded w-full'
     />
    </div>
    <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded'>
     Enviar mensaje
    </button>
   </form>
  </div>
 )
}

export default ContactForm
