import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

export default function ShoppingCart({ onCancel }) {
  const elRef = useRef(null);
  const productsInCart = useSelector((state) => state.cartItems.value.products);

  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const cartRoot = document.getElementById('cart');
    cartRoot.appendChild(elRef.current);

    return () => cartRoot.removeChild(elRef.current);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {};
    const formData = new FormData(e.target);
    for (const [name, value] of formData.entries()) {
      console.log(`${name}, ${value}`);
      const [category, productId] = name.split('.');
      payload[category]
        ? payload[category].push({ productId, value })
        : (payload[category] = [{ productId, value }]);
    }
    console.log(payload);
  };

  const showProducts = () => {
    if (Object.keys(productsInCart).length <= 0) {
      return null;
    }
    return Object.values(productsInCart)
      .flat()
      .map((item) => {
        const { id, name } = item;
        return (
          <tr key={id}>
            <td>{name}</td>
            <td>
              <input type="number" name={id} defaultValue="1" min="0" />
            </td>
          </tr>
        );
      });
  };

  const showProducts2 = () => {
    const categories = Object.keys(productsInCart);
    if (categories.length <= 0) {
      return null;
    }

    for (const category in productsInCart) {
      console.log(category, productsInCart[category]);
    }

    return categories.map((category) => {
      return productsInCart[category].map((product) => {
        const { id, name, pricePerKg } = product;
        return (
          <tr key={id}>
            <td>{name}</td>
            <td>
              <input
                type="number"
                name={`${category}.${id}`}
                defaultValue="1"
                min="0"
                data-value={pricePerKg}
                onChange={(e) => {
                  const quantity = e.target.value;
                  const price = e.target.dataset.value;
                  document.getElementById(id).innerText = quantity * price;
                }}
              />
            </td>
            <td id={id}>{pricePerKg}</td>
          </tr>
        );
      });
    });
  };

  return createPortal(
    <article className="cart">
      <div>
        <h3>Shopping Cart</h3>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              {showProducts2()}
            </tbody>
          </table>
          <input type="submit" value="Place Order" />
          <input type="button" value="Cancel" onClick={() => onCancel()} />
        </form>
      </div>
    </article>,
    elRef.current
  );
}
