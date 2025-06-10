import Product from '@/product'
import Filters from "@/components/filters";
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '@/redux/features/product';
import LoadingBar from '@/components/LoadingBar';




export default function Landing() {
  const { status, items, error } = useSelector((state: RootState) => state.products)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if(status == "loading") {
    return <div className='size-full flex justify-center items-center'><LoadingBar /></div>
  }
  if(status == "failed") {
    return <div>{error}</div>
  }
  return (
    <div className='w-full p-8 space-y-4'>
      <img src='https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='w-full h-80 object-cover rounded-lg' />
      {/* Filters */}
      <Filters /> 
      {/* Products list */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {items.map((product, index) => <Product key={index.toString()} product={product} />)}

      </div>
    </div>
  )
}
