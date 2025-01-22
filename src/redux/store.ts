import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "@/redux/features/couter"

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

export default store;



// Type for RootState
export type RootState = ReturnType<typeof store.getState>;

// Type for AppDispatch
export type AppDispatch = typeof store.dispatch;