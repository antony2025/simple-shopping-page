import { useState } from 'react';
import { Outlet, NavLink, useLoaderData } from 'react-router-dom';
import Header from '../components/header';
import Modal from '../components/modal';
import ShoppingCart from '../containers/cart';

export function loader() {
  return { categories: [{ name: 'Vegetables' }, { name: 'Fruits' }, { name: 'Cheese' }] };
}

export default function Root() {
  const { categories } = useLoaderData();
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="wrapper">
      <Header showShoppingCart={() => setShowCart(true)} />
      <nav className="sidebar">
        {categories.length ? (
          <ul>
            {categories.map((category) => (
              <li key={category.name}>
                <NavLink to={`/${category.name}`}>{category.name}</NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories</p>
        )}
      </nav>
      <article className="content">
        <Outlet />
      </article>
      {showCart ? (
        <Modal>
          <ShoppingCart onCancel={() => setShowCart(false)} />
        </Modal>
      ) : null}
    </div>
  );
}
