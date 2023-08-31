import React from 'react';

const TotalEarnings = ({ earnings }) => {
  return (
    <div className="total-earnings">
      <h2>Revenu quotidien</h2>
      <p>${earnings.toFixed(2)}</p>
    </div>
  );
};

export default TotalEarnings;
