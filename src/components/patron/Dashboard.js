import React, { useState, useEffect } from 'react';
import CustomerCount from './CustomerCount';
import OrderCount from './OrderCount';
import TotalEarnings from './TotalEarnings';
import EarningsChart from './EarningsChart';

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    setCustomerCount(45);
    setOrderCount(60);
    setTotalEarnings(1500.50);
  }, []);

  const dataByWeek = [
    { week: 'Week 1', earnings: 500.25 },
    { week: 'Week 2', earnings: 620.30 },
    // exemple avant d'aattribuer les données à partir du backe,d
  ];

  const dataByMonth = [
    { month: 'January', earnings: 1500.75 },
    { month: 'February', earnings: 1800.90 },
  ];

  return (
    <div className="dashboard">
      <div>
        <h2>Number of Customers</h2>
        <p>{customerCount}</p>
      </div>
      <div>
        <h2>Number of Orders</h2>
        <p>{orderCount}</p>
      </div>
      <div>
        <h2>Total Earnings</h2>
        <p>${totalEarnings.toFixed(2)}</p>
      </div>
      <div>
        <EarningsChart dataByWeek={dataByWeek} dataByMonth={dataByMonth} />
      </div>
    </div>
  );
};

export default Dashboard;
