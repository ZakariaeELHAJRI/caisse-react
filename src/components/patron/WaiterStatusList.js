import React from 'react';

const WaiterStatusList = ({ waiters }) => {
  return (
    <div className="waiter-status-list">
      <h3>Waiter Status</h3>
      <ul>
        {waiters.map((waiter) => (
          <li key={waiter.waiterId} className="waiter-item">
            {waiter.name}: {waiter.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaiterStatusList;
