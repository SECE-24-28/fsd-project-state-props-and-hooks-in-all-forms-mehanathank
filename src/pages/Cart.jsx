import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

const validPromos = { 'STYLE10': 10, 'HUB20': 20, 'SAVE50': 50 }

export default function Cart() {
  const { cart, changeQty, removeItem, clearCart } = useCart()
  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoMsg, setPromoMsg] = useState({ text: '', type: '' })

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const total = subtotal - discount

  function applyPromo() {
    const code = promo.trim().toUpperCase()
    if (validPromos[code]) {
      setDiscount(validPromos[code])
      setPromoMsg({ text: `Promo applied! Rs. ${validPromos[code]} off`, type: 'success' })
    } else {
      setDiscount(0)
      setPromoMsg({ text: 'Promo code not found', type: 'error' })
    }
  }

  function checkout() {
    if (cart.length === 0) { alert('Your cart is empty!'); return }
    alert(`Order placed successfully! Total: Rs. ${total}`)
    clearCart()
    setDiscount(0)
    setPromoMsg({ text: '', type: '' })
  }

  return (
    <>
      <Navbar />
      <div className="cart-page">

        {/* Cart Items */}
        <div className="cart-items">
          <h2 className="cart-title">Your Cart</h2>
          <p className="cart-count">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>

          {cart.length === 0 && <p style={{ color: '#8b4513' }}>Your cart is empty.</p>}

          {cart.map(item => (
            <div key={`${item.id}-${item.size}-${item.colour}`} className="cart-card">
              <img src={item.img} alt={item.name} className="cart-card-img" />
              <div className="cart-card-info">
                <h5 className="cart-card-name">{item.name}</h5>
                <p className="cart-card-meta">Size: {item.size} | Colour: {item.colour}</p>
                <div className="cart-qty">
                  <button onClick={() => changeQty(item.id, item.size, item.colour, -1)} className="qty-btn">-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => changeQty(item.id, item.size, item.colour, 1)} className="qty-btn">+</button>
                </div>
              </div>
              <div className="cart-card-price">
                <p className="cart-item-total">Rs. {item.price * item.qty}</p>
                <p onClick={() => removeItem(item.id, item.size, item.colour)} className="cart-remove">Remove</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h4 className="summary-title">Order Summary</h4>
          {[['Subtotal', `Rs. ${subtotal}`], ['Shipping', 'Free'], ['Discount', `- Rs. ${discount}`]].map(([label, val]) => (
            <div key={label} className="summary-row">
              <span>{label}</span><span>{val}</span>
            </div>
          ))}
          <hr className="summary-hr" />
          <div className="summary-row summary-total">
            <strong style={{ color: '#6b3a2a' }}>Total</strong>
            <strong style={{ color: '#6b3a2a' }}>Rs. {total}</strong>
          </div>
          <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="Promo code" className="promo-input" />
          {promoMsg.text && <p className={promoMsg.type === 'success' ? 'success-msg' : 'error-msg'}>{promoMsg.text}</p>}
          <button onClick={applyPromo} className="promo-btn">Apply Promo</button>
          <button onClick={checkout} className="checkout-btn">Checkout</button>
        </div>
      </div>
      <Footer />
    </>
  )
}
