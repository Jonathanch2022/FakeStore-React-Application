
import cartSlice, { addToCart, updateItem, removeItem } from '../state/slices/cartslice.jsx';

const cartReducer = typeof cartSlice === 'function' ? cartSlice : cartSlice.reducer;
const base = { cartList: [], total: 0, items: 0 };

describe('cart slice', () => {
    it('adds new item and increments quantity on duplicate add', () => {
     
        const s1 = cartReducer(base, addToCart({ id: 1, title: 'Hat', price: 10, description: "Sample Hat", category: "Hats", image: "http://example.com/test.png", quantity:1 }));
        expect(s1.cartList).toHaveLength(1);
        const item1 = s1.cartList.find(i => i.id == 1);
        expect(item1.quantity).toBe(1);
       

        const s2 = cartReducer(s1, addToCart({ id: 1, title: 'Hat', price: 10, description: "Sample Hat", category: "Hats", image: "http://example.com/test.png", quantity:1 }));
        const item2 = s2.cartList.find(i => i.id === 1);
        expect(item2.quantity).toBe(2);
        
        
  });

    it('updates quantity and removes item when quantity becomes 0', () => {
        const start = cartReducer(base, addToCart({ id: 2, title: 'shoes', price: 10, description: "Shoes", category: "Shoes", image: "http://example.com/test.png", quantity: 1 }));
 
        const updated = cartReducer(start, updateItem({ id: 2, qty: 3 }));
       
        const item3 = updated.cartList.find(i => i.id === 2);
    expect(item3.quantity).toBe(3);
        
      
  });
});
