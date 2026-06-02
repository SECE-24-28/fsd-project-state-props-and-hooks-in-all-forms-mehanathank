import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../context/ToastContext'

function getProducts() {
  return JSON.parse(localStorage.getItem('sh_products') || '[]')
}

const CATS = ['men', 'women', 'kids', 'baby', 'sale']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function ProductForm({ initial, editId }) {
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState(initial || {
    name: '', category: 'men', price: '', img: '',
    description: '', sizes: ['M'], details: ['']
  })
  const [errors, setErrors] = useState({})

  function set(key, val) { setForm(f => ({ ...f, [key]: val })) }

  function toggleSize(s) {
    set('sizes', form.sizes.includes(s) ? form.sizes.filter(x => x !== s) : [...form.sizes, s])
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Product name required'
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Valid price required'
    if (!form.img.trim()) e.img = 'Image URL required'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    const products = getProducts()
    if (editId) {
      const updated = products.map(p => p.id === editId ? { ...p, ...form, price: Number(form.price), details: form.details.filter(d => d.trim()) } : p)
      localStorage.setItem('sh_products', JSON.stringify(updated))
      toast('Product updated!')
    } else {
      const newProduct = { ...form, id: Date.now(), price: Number(form.price), details: form.details.filter(d => d.trim()) }
      localStorage.setItem('sh_products', JSON.stringify([...products, newProduct]))
      toast('Product added!')
    }
    navigate('/admin/products')
  }

  return (
    <div style={{ padding: 32, maxWidth: 700 }}>
      <h2 style={{ fontFamily: 'Playfair Display,serif', color: '#6b3a2a', marginBottom: 32 }}>{editId ? 'Edit Product' : 'Add Product'}</h2>
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e0c9a6', padding: 28 }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} className={`form-input${errors.name ? ' error-border' : ''}`} placeholder="Product name" />
            {errors.name && <p className="error-msg">{errors.name}</p>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="form-input">
                {CATS.map(c => <option key={c} value={c} style={{ textTransform: 'capitalize' }}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Price (Rs.)</label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)} className={`form-input${errors.price ? ' error-border' : ''}`} placeholder="0" />
              {errors.price && <p className="error-msg">{errors.price}</p>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input value={form.img} onChange={e => set('img', e.target.value)} className={`form-input${errors.img ? ' error-border' : ''}`} placeholder="/image/..." />
            {errors.img && <p className="error-msg">{errors.img}</p>}
            {form.img && <img src={form.img} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, marginTop: 8, border: '1px solid #e0c9a6' }} />}
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className="form-input" placeholder="Product description..." style={{ resize: 'vertical' }} />
          </div>

          <div className="form-group">
            <label className="form-label">Available Sizes</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SIZES.map(s => (
                <button type="button" key={s} onClick={() => toggleSize(s)}
                  className={`size-btn${form.sizes?.includes(s) ? ' active' : ''}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Product Details (one per line)</label>
            {(form.details || ['']).map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input value={d} onChange={e => { const a = [...form.details]; a[i] = e.target.value; set('details', a) }} className="form-input" placeholder={`Detail ${i + 1}`} />
                {form.details.length > 1 && <button type="button" onClick={() => set('details', form.details.filter((_, j) => j !== i))}
                  style={{ background: '#c0392b', color: '#fff', border: 'none', borderRadius: 6, padding: '0 12px', cursor: 'pointer' }}>✕</button>}
              </div>
            ))}
            <button type="button" onClick={() => set('details', [...(form.details || []), ''])}
              style={{ background: 'none', border: '1px dashed #8b4513', color: '#8b4513', borderRadius: 8, padding: '6px 16px', cursor: 'pointer', fontSize: 13 }}>+ Add Detail</button>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button type="submit" className="btn-primary">{editId ? 'Update Product' : 'Add Product'}</button>
            <button type="button" onClick={() => navigate('/admin/products')} style={{ background: '#f0dfc0', color: '#6b3a2a', border: 'none', borderRadius: 10, padding: '13px 32px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
