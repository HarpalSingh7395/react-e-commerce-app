import { type Product } from "@/redux/features/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends Product {
    quantity: number;
    color: string;
    selectedSize: string;
    price: number;
}

interface CartState {
    items: CartItem[];
    total: number;
}



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0,
    } as CartState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id == action.payload.id)
            if (existingItem) {
                existingItem.quantity += 1
            }
            else {
                state.items.push({ ...action.payload, quantity: action.payload.quantity?action.payload.quantity:1 })
            }
            state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0)
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0)
        },
        updateQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
            const item = state.items.find(item => item.id == action.payload.id)
            if (item) {
                item.quantity = action.payload.quantity
            }
            state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0)
        },
        clearCart: (state) => {
            state.items = []
            state.total = 0
        }
    }
})

export const { addToCart, clearCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer;