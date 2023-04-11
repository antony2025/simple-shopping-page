import { Link } from 'react-router-dom';
import styles from './header.module.css';
import logo from './jacando_logo_neg.png';
import avatar from './avatar.jpg';

export default function Header({ showShoppingCart }) {
  return (
    <header className="header">
      <Link to="/">
        <img className={styles['logo']} src={logo} alt="jacando logo" />
      </Link>
      <h1>Shopping Page</h1>
      <button onClick={() => showShoppingCart()}>Cart</button>
      <div className={styles['currentUser']}>
        <p>Antony</p>
        <img className={styles['avatar']} src={avatar} alt="user avatar" />
      </div>
    </header>
  );
}
