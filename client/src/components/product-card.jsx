import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../state/cart-slice';
import styles from './product-card.module.css';

export default function ProductCard({ category, product }) {
  const { name, description, availableQuantity, pricePerKg } = product;
  const dispatch = useDispatch();
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const productsInCart = useSelector((state) => state.cartItems.value.products);

  useEffect(() => {
    const categoryInCart = productsInCart[category];
    if (categoryInCart !== undefined) {
      setAlreadyInCart(Object.hasOwn(categoryInCart, product.id));
    }
  }, []);

  const handleAdd = () => {
    dispatch(addToCart({ category, product: { ...product, orderQuantity: 1 } }));
    setAlreadyInCart(true);
  };

  return (
    <article className={styles['cardWrapper']}>
      <h3>{name}</h3>
      <h4 className={styles['description']}>{description}</h4>
      <p>Quantity: {availableQuantity} KG</p>
      <p>Price: {pricePerKg} €/KG</p>
    <div>
      {alreadyInCart ? (<p>Added to cart</p>) : 
      (<button type="button" disabled={alreadyInCart} onClick={handleAdd}>
        Add to Cart
      </button>)
}
    </div>
    </article>
  );
}
