import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const patterns = {
  name: /^[a-zA-Z ]{3,}$/,
  mobile: /^[0-9]{10,11}$/,
  email: /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
  password: /^[a-zA-Z0-9@#$%]{6,}$/
}

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', mobile: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!patterns.name.test(form.name)) e.name = 'Name must be at least 3 letters'
    if (!patterns.mobile.test(form.mobile)) e.mobile = 'Enter a valid 10-11 digit mobile number'
    if (!patterns.email.test(form.email)) e.email = 'Please enter a valid email address'
    if (!patterns.password.test(form.password)) e.password = 'Password must be at least 6 characters'
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    localStorage.setItem('name', form.name)
    localStorage.setItem('mobile', form.mobile)
    localStorage.setItem('email', form.email)
    sessionStorage.setItem('loggedIn', 'true')
    alert('Account created successfully! Welcome to StyleHub')
    navigate('/')
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '10px 14px', border: `1px solid ${errors[field] ? 'red' : '#e0c9a6'}`,
    background: '#fdf6ee', borderRadius: 8, fontSize: 14, fontFamily: 'Poppins, sans-serif',
    outline: 'none', boxSizing: 'border-box'
  })

  const fields = [
    { key: 'name', label: 'Full Name', placeholder: 'Enter your name', type: 'text' },
    { key: 'mobile', label: 'Mobile Number', placeholder: 'Enter your mobile number', type: 'tel' },
    { key: 'email', label: 'Email', placeholder: 'Enter your email', type: 'text' },
    { key: 'password', label: 'Password', placeholder: 'Create a password', type: 'password' },
    { key: 'confirm', label: 'Confirm Password', placeholder: 'Confirm your password', type: 'password' }
  ]

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url('/image/home/back.png')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '40px 0' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '50px 60px', width: 460, borderTop: '4px solid #8b4513' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#8b4513', marginBottom: 4 }}>StyleHub</h1>
          <p style={{ color: '#888', marginBottom: 24 }}>Create your account</p>
          <form onSubmit={handleSubmit}>
            {fields.map(({ key, label, placeholder, type }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ color: '#6b3a2a', fontWeight: 500, fontSize: 14, display: 'block', marginBottom: 6 }}>{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} style={inputStyle(key)} />
                {errors[key] && <p style={{ color: 'red', fontSize: 13, marginTop: 4 }}>{errors[key]}</p>}
              </div>
            ))}
            <button type="submit" style={{ width: '100%', background: '#8b4513', color: '#fff', border: 'none', height: 50, fontSize: 17, fontWeight: 600, borderRadius: 8, cursor: 'pointer' }}>Sign Up</button>
          </form>
          <p style={{ textAlign: 'center', color: '#888', marginTop: 16 }}>Already have an account? <Link to="/login" style={{ color: '#8b4513', fontWeight: 600, textDecoration: 'none' }}>Login</Link></p>
        </div>
      </div>
    </>
  )
}
