import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
  }
  
  const initialState: CounterState = {
    value: 0,
  };

export const counterSlicer = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: state => {
            state.value +=1
        },
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    },
})


export const { decrement, increment, incrementByAmount } = counterSlicer.actions
export default counterSlicer.reducer;