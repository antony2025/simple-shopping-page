import { configureStore } from '@reduxjs/toolkit';
import cartItems from './cart-slice';

const store = configureStore({
  reducer: {
    cartItems
  },
});

export default store;
