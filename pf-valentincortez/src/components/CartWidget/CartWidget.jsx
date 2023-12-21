import React from 'react';

const CartWidget = ({ totalQuantity }) => {
  return (
    <div>
      <i className="bi bi-cart4"></i>
      {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
    </div>
  );
};

export default CartWidget;
