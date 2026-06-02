import { useState } from 'react'
import { Link } from 'react-router-dom'
import AccountDropdown from './AccountDropdown'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">StyleHub</Link>
      <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">☰</button>
      <ul className={`nav-links${open ? ' nav-open' : ''}`}>
        {[['/', 'Home'], ['/products', 'Shop'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
          <li key={label} onClick={() => setOpen(false)}><Link to={to}>{label}</Link></li>
        ))}
        <li onClick={() => setOpen(false)}>
          {user ? <AccountDropdown /> : <Link to="/login">Login</Link>}
        </li>
        <li onClick={() => setOpen(false)}>
          <Link to="/cart" className="nav-cart-btn">🛒 Cart</Link>
        </li>
      </ul>
    </nav>
  )
}
