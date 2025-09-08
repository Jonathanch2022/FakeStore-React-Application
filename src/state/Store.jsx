import { configureStore } from "@reduxjs/toolkit"
import { counterSlice} from "./slices/cartslice"


export const store = configureStore({
    reducer: {
       cartData: counterSlice.reducer
    }
})

store.subscribe(() => {

    const state = store.getState();
    const cartState = state.cartData;
    localStorage.setItem("cart-1", JSON.stringify(cartState.cartList));
   
})


