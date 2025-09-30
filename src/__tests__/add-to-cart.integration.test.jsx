import React from 'react';
import userEvent from '@testing-library/user-event';
import { useDispatch, useSelector } from 'react-redux';
import { renderWithProviders } from '../test-utils.jsx';
import { addToCart} from '../state/slices/cartslice.jsx';

jest.mock('../../src/firebaseConfig', () => ({
    auth: {},
    database: {},
}));

jest.mock('../../src/components/firestore.jsx', () => ({}));

function TestAdder() {
  const dispatch = useDispatch();
  return (
      <button aria-label="Add to Cart" onClick={() => dispatch(addToCart({ id: 2, title: 'shoes', price: 10, description: "Shoes", category: "Shoes", image: "http://example.com/test.png", quantity: 1 }))}>
      Add to Cart
    </button>
  );
}
function CartBadge() {

    const items = useSelector((state) => state.cartData.cartList);
    return <span data-testid="cart-count">{items.length}</span>;
}
function Page() {
   
  return (
      <>
      <CartBadge />
      <TestAdder />
    </>
  );
}

describe('integration: add item to cart updates header count', () => {
  it('increments the cart count after clicking Add to Cart', async () => {
      const user = userEvent.setup();
      const { getByText, getByTestId, findByTestId } = renderWithProviders(<Page />);

    const before = getByTestId("cart-count");
    if (before) expect(before).toHaveTextContent("0");

      const addBtn = getByText("Add to Cart");
    await user.click(addBtn);
    const after = await getByTestId("cart-count");
    expect(after).toHaveTextContent('1');
  });
});
