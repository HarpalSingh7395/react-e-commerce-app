import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Rating {
  count: number;
  rate: number;
}


export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    stock: number;
    rating: Rating;
}

interface ProductState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const products: Product = [
    {
      id: "1",
      title: 'Minimalist Desk Lamp',
      price: 89.99,
      rating: 4.5,
      reviews: 128,
      image: '/api/placeholder/300/300',
      isNew: true,
      category: 'Lighting'
    },
    {
      id: "2",
      title: 'Ergonomic Office Chair',
      price: 299.99,
      rating: 4.8,
      reviews: 256,
      image: '/api/placeholder/300/300',
      isNew: false,
      category: 'Furniture'
    },
    {
      id: "3",
      title: 'Wireless Keyboard',
      price: 129.99,
      rating: 4.6,
      reviews: 189,
      image: '/api/placeholder/300/300',
      isNew: true,
      category: 'Electronics'
    },
    {
      id: "4",
      title: 'Monitor Stand',
      price: 49.99,
      rating: 4.3,
      reviews: 95,
      image: '/api/placeholder/300/300',
      isNew: false,
      category: 'Accessories'
    },
    {
      id: "5",
      title: 'Leather Mouse Pad',
      price: 34.99,
      rating: 4.7,
      reviews: 142,
      image: '/api/placeholder/300/300',
      isNew: false,
      category: 'Accessories'
    },
    {
      id: "6",
      title: 'USB-C Hub',
      price: 79.99,
      rating: 4.4,
      reviews: 167,
      image: '/api/placeholder/300/300',
      isNew: true,
      category: 'Electronics'
    }
  ]


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        // Implement API call to fetch products
        // const response = await fetch('/api/products');
        const response = await fetch("https://fakestoreapi.com/products").then(res => res.json())
        console.log({response})
        return response;
        // return response.json();
    }
);

export const selectProductById = (state: RootState, productId: string) =>
  state.products.items.find((p) => p.id.toString() === productId);

const productSlicer = createSlice({
    name: 'product',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    } as ProductState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            })
    }
})

export default productSlicer.reducer;