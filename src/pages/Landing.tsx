import Product, { type Product as ProductType } from '@/product'
import Filters from "@/components/filters";


const products: ProductType[] = [
  {
    id: "1",
    name: 'Minimalist Desk Lamp',
    price: 89.99,
    rating: 4.5,
    reviews: 128,
    image: '/api/placeholder/300/300',
    isNew: true,
    category: 'Lighting'
  },
  {
    id: "2",
    name: 'Ergonomic Office Chair',
    price: 299.99,
    rating: 4.8,
    reviews: 256,
    image: '/api/placeholder/300/300',
    isNew: false,
    category: 'Furniture'
  },
  {
    id: "3",
    name: 'Wireless Keyboard',
    price: 129.99,
    rating: 4.6,
    reviews: 189,
    image: '/api/placeholder/300/300',
    isNew: true,
    category: 'Electronics'
  },
  {
    id: "4",
    name: 'Monitor Stand',
    price: 49.99,
    rating: 4.3,
    reviews: 95,
    image: '/api/placeholder/300/300',
    isNew: false,
    category: 'Accessories'
  },
  {
    id: "5",
    name: 'Leather Mouse Pad',
    price: 34.99,
    rating: 4.7,
    reviews: 142,
    image: '/api/placeholder/300/300',
    isNew: false,
    category: 'Accessories'
  },
  {
    id: "6",
    name: 'USB-C Hub',
    price: 79.99,
    rating: 4.4,
    reviews: 167,
    image: '/api/placeholder/300/300',
    isNew: true,
    category: 'Electronics'
  }
];




export default function Landing() {
  return (
    <div className='w-full p-8 space-y-4'>
      <img src='https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='w-full h-80 object-cover rounded-lg' />
      {/* Filters */}
      <Filters /> 
      {/* Products list */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {products.map((product, index) => <Product key={index.toString()} product={product} />)}

      </div>
    </div>
  )
}
