import { createSlice } from "@reduxjs/toolkit"
import CartItem from "../../components/CartItem";

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
        total: 10,
        items: 15,
        cartList:[]
    },
    reducers: {
        addToCart: (state, action) => {
            if (action.payload) {
               
                let exist = false;
                for (let t in state.cartList) {

                   
                    if (state.cartList[t].id == action.payload.item.id) {

                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                   
                    state.cartList.push(action.payload.item);
                   
                }
                else {
                   
                    state.cartList.map((item) => {

                        if (item.id == action.payload.item.id) {

                            if (action.payload.qty == null || action.payload.qty == 0) {
                                item.quantity += 1;
                               
                             
                            }
                            else {

                                item.quantity += parseInt(action.payload.qty);
                               
                            }
                            return (item);
                            
                        }
                    })
                }
              
            

            }
            
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
               
                item.id == action.payload;
            });
          
           

        },
        loadCart: (state, action) => {

            const DataCart = localStorage.getItem("cart-1");
            const items = JSON.parse(DataCart);
            state.cartList = items;
           


        },
        updateItem: (state, action) => {

             state.cartList.map((items) => {

                if (items.id == action.payload.id) {

                    items.quantity = action.payload.quantity;
                    return (items);
                }
             })
          

        }
      
       
    }
})

export const { updateItem, loadCart, removeItem, addToCart, updateCartStatus, setCart } = counterSlice.actions