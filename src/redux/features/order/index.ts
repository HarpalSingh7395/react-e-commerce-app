import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../cart";

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    createdAt: Date;
}

interface OrderState {
    orders: Order[];
    currentOrder: Order | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData: Omit<Order, 'id' | 'createdAt'>) => {
        // Implement API call to create order
        const response = await fetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
        return response.json();
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        currentOrder: null,
        status: 'idle'
    } as OrderState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders.push(action.payload);
                state.currentOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state) => {
                state.status = 'failed';
            });
    }
})

export default orderSlice.reducer;