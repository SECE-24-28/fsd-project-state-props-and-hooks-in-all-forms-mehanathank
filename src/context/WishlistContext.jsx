import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.id || 'guest'

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem(`sh_wishlist_${userId}`) || '[]')
  })

  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem(`sh_wishlist_${userId}`) || '[]'))
  }, [userId])

  function save(items) {
    setWishlist(items)
    localStorage.setItem(`sh_wishlist_${userId}`, JSON.stringify(items))
  }

  function addToWishlist(product) {
    if (wishlist.find(i => i.id === product.id)) return
    save([...wishlist, product])
  }

  function removeFromWishlist(id) {
    save(wishlist.filter(i => i.id !== id))
  }

  function isWishlisted(id) { return wishlist.some(i => i.id === id) }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() { return useContext(WishlistContext) }
