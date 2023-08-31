import React from 'react';

const CustomerCount = ({ count }) => {
  return (
    <div className="customer-count">
      <h2>Nombre des clients du jour</h2>
      <p>{count}</p>
    </div>
  );
};

export default CustomerCount;
