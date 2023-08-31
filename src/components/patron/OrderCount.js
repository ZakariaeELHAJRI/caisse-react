import React from 'react';

const OrderCount = ({ count }) => {
  return (
    <div className="order-count">
      <h2>Nombre des commandes du jour</h2>
      <p>{count}</p>
    </div>
  );
};

export default OrderCount;
