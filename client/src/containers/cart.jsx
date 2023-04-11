import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../state/cart-slice';
import client, { PLACE_ORDER } from '../api';
import cloneDeep from 'lodash/cloneDeep';

import styles from './cart.module.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const newState = cloneDeep(action.payload);
      for (const productIds of Object.values(newState)) {
        for (const product of Object.values(productIds)) {
          product.orderPrice = product.pricePerKg;
        }
      }
      return newState;
    }
    case 'PRODUCT_DELETE': {
      const { category, id } = action.payload;
      const newState = Object.assign({}, { ...state });
      newState[category][id] = null;
      delete newState[category][id];
      return newState;
    }
    case 'QUANTITY_CHANGE': {
      const { category, id, quantity } = action.payload;
      const newState = Object.assign({}, { ...state });
      newState[category][id].orderQuantity = +quantity;
      newState[category][id].orderPrice = +quantity * newState[category][id].pricePerKg;
      return newState;
    }
    default:
      return state;
  }
};

// TODO: break down this component into smaller components
export default function ShoppingCart({ onCancel }) {
  const productsInCart = useSelector((state) => state.cartItems.value.products);
  const dispatchToAppStore = useDispatch();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {});
  const [orderStatus, setOrderStatus] = useState({
    loading: false,
    error: undefined,
    data: undefined,
  });

  useEffect(() => dispatch({ type: 'INIT', payload: productsInCart }), [productsInCart]);

  let totalPrice = 0;
  for (const productIds of Object.values(state)) {
    for (const product of Object.values(productIds)) {
      totalPrice += product.orderPrice;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productList = [];
    for (const [category, productIds] of Object.entries(state)) {
      for (const [id, product] of Object.entries(productIds)) {
        const { orderQuantity } = product;
        productList.push({ category, id, orderQuantity });
      }
    }
    if (productList.length <= 0) {
      alert('Cannot order - no items in the cart.'); // TODO: add proper error toast
      return;
    }
    setOrderStatus({ loading: true, error: undefined, data: undefined });
    try {
      const result = await client.mutate({
        mutation: PLACE_ORDER,
        variables: { input: productList },
      });
      setOrderStatus({ loading: false, error: undefined, data: result.data });
    } catch (error) {
      setOrderStatus({ loading: false, error, data: undefined });
    }
  };

  const showProducts = () => {
    if (Object.keys(state).length <= 0) {
      return null;
    }
    const productList = [];
    for (const [category, productIds] of Object.entries(state)) {
      for (const [id, product] of Object.entries(productIds)) {
        const { name, orderPrice, orderQuantity } = product;
        productList.push(
          <tr key={id}>
            <td>{name}</td>
            <td>
              <input
                type="number"
                name={id}
                defaultValue={orderQuantity || '1'}
                min="1"
                max="10"
                className={styles['input']}
                onChange={(e) =>
                  dispatch({
                    type: 'QUANTITY_CHANGE',
                    payload: { category, id, quantity: e.target.value },
                  })
                }
              />
            </td>
            <td id={`price${id}`}>{orderPrice}</td>
            <td>
              <input
                type="button"
                value="X"
                onClick={() => dispatch({ type: 'PRODUCT_DELETE', payload: { category, id } })}
              />
            </td>
          </tr>
        );
      }
    }
    return productList;
  };

  if (orderStatus.error) {
    return (
      <article>
        <h3>Error while placing order. Please try again after some time.</h3>
        <button
          onClick={() => setOrderStatus({ error: undefined, loading: false, data: undefined })}
        >
          OK
        </button>
      </article>
    );
  }

  if (orderStatus.data) {
    return (
      <article>
        <h3>Order success!</h3>
        <h4>Order id: {orderStatus.data.order.id}</h4>
        <button
          onClick={() => {
            dispatchToAppStore(clearCart());
            onCancel();
            navigate('/');
          }}
        >
          OK
        </button>
      </article>
    );
  }

  return (
    <article>
      <h3>Shopping Cart</h3>
      {orderStatus.loading ? (
        <h3>Placing order...</h3>
      ) : (
        <form className={styles['form']} onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Delete from cart</th>
              </tr>
              {showProducts()}
            </tbody>
          </table>
          <label htmlFor="totalPrice">Total Price:</label>
          <input
            type="text"
            id="totalPrice"
            name="totalPrice"
            value={totalPrice.toFixed(2)}
            disabled
          />
          <div>
            <input type="submit" value="Place Order" />
            <input type="button" onClick={() => onCancel()} value="Cancel" />
          </div>
        </form>
      )}
    </article>
  );
}
