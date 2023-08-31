import React from 'react';

const OrderStatusList = ({ orders, onSelectOrder }) => {
  return (
    <div className="order-status-list">
      <h3>Orders Status</h3>
      <ul>
        {orders.map((order) => (
          <li
            key={order.orderId}
            onClick={() => onSelectOrder(order.orderId)}
            className="order-item"
          >
            Order #{order.orderId}: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderStatusList;
