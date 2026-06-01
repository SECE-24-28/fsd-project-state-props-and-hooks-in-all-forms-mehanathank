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
      <div className="auth-bg">
        <div className="auth-card">
          <h1 className="auth-brand">StyleHub</h1>
          <p className="auth-sub">Create your account</p>
          <form onSubmit={handleSubmit}>
            {fields.map(({ key, label, placeholder, type }) => (
              <div key={key} className="form-group">
                <label className="form-label">{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder}
                  className={`form-input${errors[key] ? ' error-border' : ''}`} />
                {errors[key] && <p className="error-msg">{errors[key]}</p>}
              </div>
            ))}
            <button type="submit" className="auth-submit">Sign Up</button>
          </form>
          <p className="auth-footer">Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
        </div>
      </div>
    </>
  )
}
