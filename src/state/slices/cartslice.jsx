import { createSlice } from "@reduxjs/toolkit"



export function tallyCart(itemList) {

    let newtotal = 0;
    let newcount = 0;
    for (let t in itemList) {
        newtotal += parseInt(itemList[t].price) * parseInt(itemList[t].quantity);
        newcount += itemList[t].quantity;
    }
    const values = {

        items:newcount,
        total: newtotal
    }
    
    return (values);
}
export const counterSlice = createSlice({
    name: 'cartData',
    initialState: {
        total: 0,
        items: 0,
        cartList:[]
    },
    reducers: {
        addToCart: (state, action) => {
            if (action.payload) {
               
                let exist = false;
                for (let t in state.cartList) {

                   
                    if (state.cartList[t].id == action.payload.id) {

                        exist = true;
                        break;
                    }
                }
                if (!exist) {

                    (state.cartList) ? state.cartList : [];
                    state.cartList.push(action.payload);
                    for (let t in state.cartList) {

                        state.items += parseInt(state.cartList[t].quanity);
                        state.total += (parseInt(state.cartList[t].price) * parseInt(state.cartList[t].quanity));
                    }
                   
                }
                else {

                   // state.cartList = [];

                    for (let t in state.cartList) {

                        if (state.cartList[t].id == action.payload.id) {

                            state.cartList[t].quantity += action.payload.quantity;
                            break;
                        }
                    }
                     
                }
              
            

            }
            
        },
        resetCart: (state, action) => {
            state.cartList = [];
            localStorage.setItem("cart-1", JSON.stringify([]));
        },
        setCart: (state, action) => {
            state.cartList = action.payload;
           
         
        },

        updateCartStatus: (state, action) => {
            if (action.payload.total  != null) {
                state.total = action.payload.total;
            }
            if (action.payload.items != null) {
                state.items = action.payload.items;
            }
        },
        removeItem: (state, action) => {
            state.cartList = state.cartList.filter((item) => {
                return parseInt(item.id) !== parseInt(action.payload);
            });
        },
        loadCart: (state, action) => {

            const DataCart = localStorage.getItem("cart-1");
            const items = (DataCart) ? JSON.parse(DataCart) : [];
            state.cartList = items;
           


        },
        updateItem: (state, action) => {

             state.cartList.map((items) => {

                if (items.id == action.payload.id) {

                    items.quantity = parseInt(action.payload.qty);
                    return (items);
                }
             })
          

        }
      
       
    }
})

export const { resetCart, updateItem, loadCart, removeItem, addToCart, updateCartStatus, setCart } = counterSlice.actions;
export default counterSlice.reducer;