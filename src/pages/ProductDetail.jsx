import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import products from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = products.find(p => p.id === parseInt(id))

  const [mainImg, setMainImg] = useState(product?.frontImg || product?.colours?.[0]?.img || product?.img)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M')
  const [selectedColour, setSelectedColour] = useState(product?.colours?.[0]?.name || 'Default')

  if (!product) return <><Navbar /><p style={{ padding: 40 }}>Product not found.</p><Footer /></>

  function handleColour(c) { setMainImg(c.img); setSelectedColour(c.name) }

  function handleAddToCart() {
    addToCart(product, selectedSize, selectedColour, mainImg)
    alert(`${product.name} (Size: ${selectedSize}${product.colours ? ', ' + selectedColour : ''}) added to cart!`)
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
            <button onClick={handleAddToCart} className="btn-primary" style={{ width: '100%' }}>Add to Cart</button>
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
