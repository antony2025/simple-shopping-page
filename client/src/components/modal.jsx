import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

export default function Modal({ children }) {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const cartRoot = document.getElementById('cart');
    cartRoot.appendChild(elRef.current);

    return () => cartRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <article className={styles['modalWrapper']}>
      <div className={styles['modalContent']}>{children}</div>
    </article>,
    elRef.current
  );
}
