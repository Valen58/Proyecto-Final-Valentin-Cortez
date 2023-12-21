import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget.jsx';
import { useCart } from '../CartContext/CartContext.jsx';

const NavBar = () => {
  const { cart } = useCart();
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    // Calculate total quantity whenever the cart changes
    const newTotalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantity(newTotalQuantity);
  }, [cart]);

  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/category/zapatillas">Zapatillas</Link>
      <Link to="/category/camisetas">Camisetas</Link>
      <Link to="/category/buzos">Buzos</Link>
      <Link to="/cart" id="carrito">
        <CartWidget totalQuantity={totalQuantity} />
      </Link>
    </nav>
  );
};

export default NavBar;
