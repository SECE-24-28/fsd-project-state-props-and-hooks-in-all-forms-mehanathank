import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState({ text: '', type: '' })
  const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/

  function handleSubscribe(e) {
    e.preventDefault()
    if (!emailPattern.test(email)) { setMsg({ text: 'Please enter a valid email address', type: 'error' }); return }
    localStorage.setItem('newsletterEmail', email)
    setMsg({ text: 'Thank you for subscribing!', type: 'success' })
    setEmail('')
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ height: 550, backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.1)), url('/image/home/homeback.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', padding: '0 80px' }}>
        <div>
          <p style={{ color: '#8b4513', letterSpacing: 3, fontSize: 13, textTransform: 'uppercase' }}>WHO WE ARE</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 65, color: '#fff', marginBottom: 12 }}>About <br />StyleHub</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18 }}>Fashion is not just clothing — it's a statement.<br />We help you make yours.</p>
        </div>
      </div>

      {/* Our Story */}
      <div style={{ padding: '60px', background: '#fff' }}>
        <p style={{ color: '#8b4513', letterSpacing: 3, fontSize: 13, textTransform: 'uppercase', textAlign: 'center' }}>OUR STORY</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#6b3a2a', textAlign: 'center', fontSize: 32, marginBottom: 40 }}>Born from a Passion for Style</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <img src="/image/home/homeback.jpg" alt="Our Story" style={{ width: '100%', height: 380, objectFit: 'cover', borderRadius: 12 }} />
          <div>
            <p style={{ color: '#6b3a2a', lineHeight: 1.9, marginBottom: 16 }}>StyleHub was founded with a simple belief — everyone deserves to look and feel their best. What started as a small boutique has grown into a destination for fashion lovers across the country.</p>
            <p style={{ color: '#6b3a2a', lineHeight: 1.9 }}>We curate timeless pieces and modern trends for men, women, kids, and babies — all under one roof. Quality, comfort, and style are at the heart of everything we do.</p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ padding: '60px' }}>
        <p style={{ color: '#8b4513', letterSpacing: 3, fontSize: 13, textTransform: 'uppercase', textAlign: 'center' }}>WHAT DRIVES US</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#6b3a2a', textAlign: 'center', fontSize: 32, marginBottom: 40 }}>Our Core Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {[['🎨 Curated Style', 'Every piece is hand-picked by our fashion experts to ensure it meets our standards of style and quality.'],
            ['♻️ Sustainability', 'We are committed to ethical sourcing and reducing our environmental footprint with every collection.'],
            ['💎 Premium Quality', 'From fabric to finish, we never compromise on quality. Every stitch is made to last.'],
            ['🤝 Customer First', 'Your satisfaction is our priority. Easy returns, fast shipping, and support — always.']
          ].map(([title, text]) => (
            <div key={title} style={{ background: '#f0dfc0', borderRadius: 12, padding: 24 }}>
              <h5 style={{ color: '#6b3a2a', fontWeight: 600, marginBottom: 8 }}>{title}</h5>
              <p style={{ color: '#6b3a2a', fontSize: 14 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={{ padding: '60px', background: '#fff' }}>
        <p style={{ color: '#8b4513', letterSpacing: 3, fontSize: 13, textTransform: 'uppercase', textAlign: 'center' }}>THE PEOPLE BEHIND STYLEHUB</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#6b3a2a', textAlign: 'center', fontSize: 32, marginBottom: 40 }}>Meet Our Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          <div style={{ background: '#f0dfc0', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <img src="/image/home/ceo.jpeg" alt="Mehanathan" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%', margin: '0 auto 12px', display: 'block', border: '3px solid #e0c9a6' }} />
            <h5 style={{ color: '#6b3a2a', fontWeight: 600 }}>Mehanathan</h5>
            <p style={{ color: '#6b3a2a', fontSize: 14 }}>Founder & CEO</p>
          </div>
          {[['👨', 'Omar Khalid', 'Head of Design'], ['👩', 'Lina Hassan', 'Marketing Director'], ['👨', 'Yusuf Ali', 'Lead Developer']].map(([icon, name, role]) => (
            <div key={name} style={{ background: '#f0dfc0', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>{icon}</div>
              <h5 style={{ color: '#6b3a2a', fontWeight: 600 }}>{name}</h5>
              <p style={{ color: '#6b3a2a', fontSize: 14 }}>{role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div style={{ padding: '60px', background: '#fff', textAlign: 'center' }}>
        <p style={{ color: '#8b4513', letterSpacing: 3, fontSize: 13, textTransform: 'uppercase' }}>STAY UPDATED</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#6b3a2a', fontSize: 32, marginBottom: 24 }}>Subscribe to Our Newsletter</h2>
        <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"
            style={{ width: 420, padding: '10px 14px', border: '1px solid #e0c9a6', background: '#fdf6ee', borderRadius: 8, fontSize: 14, fontFamily: 'Poppins, sans-serif' }} />
          {msg.text && <p style={{ color: msg.type === 'success' ? 'green' : 'red', fontSize: 13 }}>{msg.text}</p>}
          <button type="submit" style={{ background: '#8b4513', color: '#fff', border: 'none', padding: '10px 36px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 15 }}>Subscribe</button>
        </form>
      </div>

      <Footer />
    </>
  )
}
