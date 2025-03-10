// src/context/CartContext.js
import { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
 const [cart, setCart] = useState([])

 const addToCart = (product) => {
  setCart((prevCart) => [...prevCart, product])
 }

 const removeFromCart = (productId) => {
  setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
 }

 const clearCart = () => {
  setCart([])
 }

 return (
  <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
   {children}
  </CartContext.Provider>
 )
}

export const useCart = () => useContext(CartContext)
