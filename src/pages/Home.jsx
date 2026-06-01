import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="hero">
        <div className="hero-content">
          <div className="hero-badge">NEW COLLECTION 2025</div>
          <h1 className="hero-title">Elevate Your<br />Everyday Style</h1>
          <p className="hero-sub">Discover the latest trends in fashion.<br />Timeless pieces, modern designs, just for you.</p>
          <div className="hero-btns">
            <Link to="/products" className="btn-primary">Shop Now</Link>
            <Link to="/about" className="btn-outline">Our Story</Link>
          </div>
        </div>
      </div>

      {/* Features Strip */}
      <div className="features-strip">
        {[['🚚', 'Free Shipping on orders over Rs. 999'], ['↩️', 'Easy 30-Day Returns'], ['💎', '100% Authentic Products'], ['🔒', 'Secure Payments']].map(([icon, text]) => (
          <div key={text} className="feature-item"><span>{icon}</span>{text}</div>
        ))}
      </div>

      {/* Shop by Category */}
      <div className="section-pad">
        <p className="section-title">BROWSE</p>
        <h2 className="section-heading">Shop by Category</h2>
        <div className="grid-4">
          {[['men.png', 'Men'], ['woman.png', 'Women'], ['kids.png', 'Kids'], ['baby.png', 'Baby']].map(([img, label]) => (
            <Link to="/products" key={label} className="cat-card">
              <img src={`/image/home/${img}`} alt={label} className="cat-img" />
              <div className="cat-overlay">
                <h5 className="cat-name">{label}</h5>
                <p className="cat-sub">Explore collection →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="section-pad bg-white">
        <p className="section-title">HAND PICKED</p>
        <h2 className="section-heading">Featured Products</h2>
        <div className="grid-4">
          {[['men jacket.png', 'Classic Men Jacket', 899], ['men dress.png', 'Men Dress', 749], ['kids 1.png', 'Kids Dress', 499], ['sale.png', 'Sale Special', 299]].map(([img, name, price]) => (
            <div key={name} className="product-card">
              <img src={`/image/home/${img}`} alt={name} className="product-img" />
              <div className="product-info">
                <h5 className="product-name">{name}</h5>
                <p className="product-price">Rs. {price}</p>
                <Link to="/products" className="product-btn">Shop Now</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="section-pad">
        <div className="promo-banner">
          <p className="promo-label">LIMITED TIME</p>
          <h2 className="promo-title">Up to 50% Off<br />Sale Collection</h2>
          <p className="promo-sub">Don't miss out on our biggest sale of the season.</p>
          <Link to="/products" className="promo-cta">Shop the Sale</Link>
        </div>
      </div>

      {/* Testimonials */}
      <div className="section-pad bg-white">
        <p className="section-title">WHAT THEY SAY</p>
        <h2 className="section-heading">Customer Reviews</h2>
        <div className="grid-3">
          {[['Amazing quality and fast delivery. StyleHub is my go-to for fashion. Highly recommend!', 'Sara A.'],
            ['Love the kids collection! Great fabric, perfect sizing, and the prices are unbeatable.', 'Omar K.'],
            ["Ordered twice already. The men's jacket is exactly as shown. Will definitely order again.", 'Yusuf M.']
          ].map(([text, name]) => (
            <div key={name} className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"{text}"</p>
              <h6 className="review-name">— {name}</h6>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
