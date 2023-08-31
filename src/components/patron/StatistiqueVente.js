import React, { useState, useEffect } from 'react';
import CustomerCount from './CustomerCount';
import OrderCount from './OrderCount';
import TotalEarnings from './TotalEarnings';
import EarningsChart from './EarningsChart';
import './StatistiqueVente.css';
import "../gestionnaire/usersList.css";

const Svente = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    setCustomerCount(45);
    setOrderCount(60);
    setTotalEarnings(15000.75);
  }, []);

  const dataByWeek = [
    { week: 'semaine 1', earnings: 5000.25 },
    { week: 'semaine 2', earnings: 3000.30 },
    { week: 'semaine 3', earnings: 1500.30 },
    { week: 'semaine 4', earnings: 4500.30 },
    // exemple avant d'aattribuer les données à partir du backe,d
  ];

  const dataByMonth = [
    { month: 'Janvier', earnings: 15000.75 },
    { month: 'Fevrier', earnings: 18000.90 },
    { month: 'Mars', earnings: 14000.90 },
    { month: 'Avril', earnings: 8000.90 },
    { month: 'Mai', earnings: 18000.90 },
    { month: 'Juin', earnings: 20000.90 },
  ];

  return (
    <div className="dashboard">
      <div className="statistiqueVente">
        <h1 className='wewe'>Statistique des Ventes </h1>
      </div>
      <div className="card-container">
        <div className="dashboard-card">
          <h2>Nouveaux Clients</h2>
          <p>{customerCount}</p>
        </div>
        <div className="dashboard-card">
          <h2>Nouvelles Commandes</h2>
          <p>{orderCount}</p>
        </div>
        <div className="dashboard-card">
          <h2>Revenu Total</h2>
          <p>${totalEarnings.toFixed(2)}</p>
        </div>
      </div>
      <div>
        <EarningsChart dataByWeek={dataByWeek} dataByMonth={dataByMonth} />
      </div>
    </div>
  );
};

export default Svente;
