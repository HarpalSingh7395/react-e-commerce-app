import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "@/redux/features/couter"
import productSlicer from './features/product';
import cartSlicer from './features/cart';
import orderSlicer from './features/order';
import userSlicer from './features/user';


const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productSlicer,
    cart: cartSlicer,
    orders: orderSlicer,
    user: userSlicer,
  }
})

export default store;



// Type for RootState
export type RootState = ReturnType<typeof store.getState>;

// Type for AppDispatch
export type AppDispatch = typeof store.dispatch;