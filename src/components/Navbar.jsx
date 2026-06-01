import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">StyleHub</Link>
      <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">☰</button>
      <ul className={`nav-links${open ? ' nav-open' : ''}`}>
        {[['/', 'Home'], ['/products', 'Shop'], ['/about', 'About'], ['#', 'Contact'], ['#', 'Profile'], ['/login', 'Login']].map(([to, label]) => (
          <li key={label} onClick={() => setOpen(false)}><Link to={to}>{label}</Link></li>
        ))}
        <li onClick={() => setOpen(false)}>
          <Link to="/cart" className="nav-cart-btn">🛒 Cart</Link>
        </li>
      </ul>
    </nav>
  )
}
