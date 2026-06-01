import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/
const passwordPattern = /^[a-zA-Z0-9@#$%]{6,}$/

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!emailPattern.test(form.email)) e.email = 'Please enter a valid email address'
    if (!passwordPattern.test(form.password)) e.password = 'Password must be at least 6 characters'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    localStorage.setItem('email', form.email)
    sessionStorage.setItem('loggedIn', 'true')
    alert('Login Successful! Welcome to StyleHub')
    navigate('/')
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '10px 14px', border: `1px solid ${errors[field] ? 'red' : '#e0c9a6'}`,
    background: '#fdf6ee', borderRadius: 8, fontSize: 14, fontFamily: 'Poppins, sans-serif',
    outline: 'none', boxSizing: 'border-box'
  })

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url('/image/home/back.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '50px 60px', width: 440, borderTop: '4px solid #8b4513' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#8b4513', marginBottom: 4 }}>StyleHub</h1>
          <p style={{ color: '#888', marginBottom: 24 }}>Login to your account</p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: '#6b3a2a', fontWeight: 500, fontSize: 14, display: 'block', marginBottom: 6 }}>Email</label>
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" style={inputStyle('email')} />
              {errors.email && <p style={{ color: 'red', fontSize: 13, marginTop: 4 }}>{errors.email}</p>}
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ color: '#6b3a2a', fontWeight: 500, fontSize: 14, display: 'block', marginBottom: 6 }}>Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Enter your password" style={inputStyle('password')} />
              {errors.password && <p style={{ color: 'red', fontSize: 13, marginTop: 4 }}>{errors.password}</p>}
            </div>
            <div style={{ textAlign: 'right', marginBottom: 20 }}>
              <Link to="/forgot" style={{ color: '#8b4513', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Forgot password?</Link>
            </div>
            <button type="submit" style={{ width: '100%', background: '#8b4513', color: '#fff', border: 'none', height: 50, fontSize: 17, fontWeight: 600, borderRadius: 8, cursor: 'pointer' }}>Login</button>
          </form>
          <p style={{ textAlign: 'center', color: '#888', marginTop: 16 }}>Don't have an account? <Link to="/signup" style={{ color: '#8b4513', fontWeight: 600, textDecoration: 'none' }}>Sign Up</Link></p>
        </div>
      </div>
    </>
  )
}
