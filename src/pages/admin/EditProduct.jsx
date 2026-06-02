import { useParams, Navigate } from 'react-router-dom'
import ProductForm from './ProductForm'

export default function EditProduct() {
  const { id } = useParams()
  const products = JSON.parse(localStorage.getItem('sh_products') || '[]')
  const product = products.find(p => p.id === Number(id))
  if (!product) return <Navigate to="/admin/products" replace />
  return <ProductForm initial={{ ...product, price: String(product.price) }} editId={product.id} />
}
