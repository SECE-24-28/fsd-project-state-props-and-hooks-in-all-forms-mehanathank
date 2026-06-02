import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import defaultProducts from '../data/products'

function getProducts() {
  const stored = localStorage.getItem('sh_products')
  return stored ? JSON.parse(stored) : defaultProducts
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()
  const toast = useToast()
  const products = getProducts()
  const product = products.find(p => p.id === parseInt(id))

  const [mainImg, setMainImg] = useState(product?.frontImg || product?.colours?.[0]?.img || product?.img)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M')
  const [selectedColour, setSelectedColour] = useState(product?.colours?.[0]?.name || 'Default')

  if (!product) return <><Navbar /><p style={{ padding: 40 }}>Product not found.</p><Footer /></>

  function handleColour(c) { setMainImg(c.img); setSelectedColour(c.name) }

  function handleAddToCart() {
    addToCart(product, selectedSize, selectedColour, mainImg)
    toast(`${product.name} added to cart!`)
  }

  function handleWishlist() {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id)
      toast('Removed from wishlist.', 'info')
    } else {
      addToWishlist(product)
      toast(`${product.name} added to wishlist!`)
    }
  }

  return (
    <>
      <Navbar />
      <div className="pd-page">
        <button onClick={() => navigate('/products')} className="pd-back">← Back to Shop</button>
        <div className="pd-grid">
          <div className="pd-images">
            <img src={mainImg} alt={product.name} className="pd-main-img" />
            {product.colours && (
              <div className="pd-thumbs">
                {product.colours.map(c => (
                  <img key={c.name} src={c.img} alt={c.name} onClick={() => handleColour(c)}
                    className={`pd-thumb${mainImg === c.img ? ' active' : ''}`} />
                ))}
              </div>
            )}
          </div>
          <div className="pd-details">
            <span className="pd-badge">{product.category.toUpperCase()}</span>
            <h1 className="pd-name">{product.name}</h1>
            <p className="pd-price">Rs. {product.price}</p>
            <p className="pd-desc">{product.description}</p>
            {product.colours && (
              <div>
                <p className="pd-label">Select Colour</p>
                <div className="pd-thumbs">
                  {product.colours.map(c => (
                    <img key={c.name} src={c.img} alt={c.name} title={c.name} onClick={() => handleColour(c)}
                      className={`pd-thumb${selectedColour === c.name ? ' active' : ''}`} />
                  ))}
                </div>
              </div>
            )}
            {product.sizes && (
              <div>
                <p className="pd-label">Select Size</p>
                <div className="pd-sizes">
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)}
                      className={`size-btn${selectedSize === s ? ' active' : ''}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleAddToCart} className="btn-primary" style={{ flex: 1 }}>Add to Cart</button>
              <button onClick={handleWishlist} style={{
                background: isWishlisted(product.id) ? '#fdf0e8' : '#fff',
                border: `2px solid ${isWishlisted(product.id) ? '#c0392b' : '#e0c9a6'}`,
                color: isWishlisted(product.id) ? '#c0392b' : '#8b4513',
                borderRadius: 10, padding: '0 20px', cursor: 'pointer', fontSize: 20
              }}>{isWishlisted(product.id) ? '❤️' : '🤍'}</button>
            </div>
            <div className="pd-details-box">
              <p className="pd-label">Product Details</p>
              <ul className="pd-detail-list">
                {product.details?.map(d => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
