import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../gestionnaire/usersList.css";

const SCommande = () => {
  const [ordersStatus, setOrdersStatus] = useState([]);
  const [waitersStatus, setWaitersStatus] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const sampleOrdersStatus = [
      { orderId: 1, status: 'Terminé' },
      { orderId: 2, status: 'En Cours' },
      { orderId: 3, status: 'En Attente' },
    ];

    const sampleWaitersStatus = [
      { waiterId: 101, name: 'John', status: 'Disponible' },
      { waiterId: 102, name: 'Alice', status: 'Occupé' },
      { waiterId: 102, name: 'Leonel', status: 'Repos' },
    ];

    setOrdersStatus(sampleOrdersStatus);
    setWaitersStatus(sampleWaitersStatus);
  }, []);

  const handleSelectOrder = (orderId) => {
    const order = ordersStatus.find((order) => order.orderId === orderId);
    setSelectedOrder(order);
  };

  return (
    <div className="statistique-commande">
      <h1 className="wewe" >Statistique des Commandes</h1>
      <div className="status-lists">
        <div className="card-list">
          <h3 className='wewe'>Commandes</h3>
          {ordersStatus.map((order) => (
            <BasicCard
              key={`order-${order.orderId}`}
              title={`Commande ID: ${order.orderId}`}
              content={`Status: ${order.status}`}
              status={order.status}
              type="order"
            />
          ))}
        </div>
        <div className="card-list">
          <h3 className='wewe'>Caissiers</h3>
          {waitersStatus.map((waiter) => (
            <BasicCard
              key={`waiter-${waiter.waiterId}`}
              title={`Caissier: ${waiter.name}`}
              content={`Status: ${waiter.status}`}
              status={waiter.status}
              type="waiter"
            />
          ))}
        </div>
      </div>
      {selectedOrder && (
        <BasicCard
          title={`Selected Order ID: ${selectedOrder.orderId}`}
          content={`Status: ${selectedOrder.status}`}
          status={selectedOrder.status}
        />
      )}
    </div>
  );
};

const BasicCard = ({ title, content, status, type }) => {
  const getStatusTagStyles = (status, type) => {
    const orderStyles = {
      Terminé: { borderColor: 'green', color: 'green' },
      'En Cours': { borderColor: 'yellow', color: 'yellow' },
      'En Attente': { borderColor: 'red', color: 'red' },
    };

    const waiterStyles = {
      Disponible: { borderColor: 'green', color: 'green' },
      Occupé: { borderColor: 'yellow', color: 'yellow' },
      Repos: { borderColor: 'red', color: 'red' },
    };

    if (type === 'order') {
      return orderStyles[status] || {};
    } else if (type === 'waiter') {
      return waiterStyles[status] || {};
    } else {
      return {};
    }
  };

  const statusTagStyles = getStatusTagStyles(status, type);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2">
          Statut:
          <span
            style={{
              color: statusTagStyles.color || 'black',
              borderColor: statusTagStyles.borderColor || 'black',
              borderWidth: '1px',
              borderStyle: 'solid',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            {status}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
};
export default SCommande;
