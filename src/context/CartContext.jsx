import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : []
  })

  function saveCart(updated) {
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  function addToCart(product, size, colour, img) {
    const updated = [...cart]
    const existing = updated.find(i => i.id === product.id && i.size === size && i.colour === colour)
    if (existing) { existing.qty += 1 }
    else { updated.push({ id: product.id, name: product.name, size, colour, price: product.price, qty: 1, img }) }
    saveCart(updated)
  }

  function changeQty(id, size, colour, change) {
    saveCart(cart.map(i => i.id === id && i.size === size && i.colour === colour ? { ...i, qty: Math.max(1, i.qty + change) } : i))
  }

  function removeItem(id, size, colour) {
    saveCart(cart.filter(i => !(i.id === id && i.size === size && i.colour === colour)))
  }

  function clearCart() { saveCart([]) }

  return (
    <CartContext.Provider value={{ cart, addToCart, changeQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() { return useContext(CartContext) }
