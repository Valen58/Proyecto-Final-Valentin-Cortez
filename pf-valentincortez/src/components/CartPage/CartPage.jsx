
import React, { useState } from 'react';
import { useCart } from '../CartContext/CartContext.jsx';
import UserRegistrationForm from '../UserRegistrationForm/UserRegistrationForm.jsx';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig'; 

const CartPage = () => {
  const { cart, clearCart } = useCart();
  const [user, setUser] = useState(null);

  const handleBuyAll = async () => {
    if (!user) {
      alert('Por favor, regístrese antes de comprar.');
      return;
    }

    if (cart.length === 0) {
      alert('El carrito está vacío. Agregue productos antes de realizar la compra.');
      return;
    }

    try {
      const orderRef = await addDoc(collection(db, 'ordenes'), {
        user: user,
        products: cart.map((item) => ({ id: item.id, price: item.price, quantity: item.quantity })),
        timestamp: serverTimestamp(),
      });

      console.log('Orden de compra enviada:', orderRef.id);

      clearCart();
      alert('Compra exitosa. Gracias por tu compra!');
    } catch (error) {
      console.error('Error al enviar la orden de compra:', error);
    }
  };

  const handleRegister = (userData) => {
    setUser(userData);
  };

  return (
    <div className="cart-page">
      <h1>Carrito de Compras</h1>
      {user ? (
        <>
          {cart.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <>
              <ul className="cart-items">
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    <p>{item.name}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Precio por unidad: ${item.price}</p>
                    <p>Total por producto: ${item.price * item.quantity}</p>
                  </li>
                ))}
              </ul>
              <p>Total a pagar: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
              <button className="buy-all-btn" onClick={handleBuyAll}>
                Comprar Todos
              </button>
            </>
          )}
        </>
      ) : (
        <UserRegistrationForm onRegister={handleRegister} />
      )}
    </div>
  );
};

export default CartPage;
