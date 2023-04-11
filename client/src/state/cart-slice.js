import { createSlice } from '@reduxjs/toolkit';

const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState: {
    value: {
      products: {},
    },
  },
  reducers: {
    addToCart: (state, action) => {
      const { category, product } = action.payload;
      const productsInCategory = state.value.products[category];
      if (productsInCategory === undefined) {
        state.value.products[category] = { [product.id]: { ...product } };
        return;
      }
      state.value.products[category] = Object.assign(
        {},
        { ...productsInCategory },
        { [product.id]: { ...product } }
      );
    },
    clearCart: (state) => {
      state.value.products = {};
    },
  },
});

export const { addToCart, clearCart } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
