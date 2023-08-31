import React, { useState } from 'react';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './StatistiqueVente.css'; // Import your CSS file

const EarningsChart = ({ dataByWeek, dataByMonth }) => {
  const [chartType, setChartType] = useState('week');

  const handleChartTypeChange = (newChartType) => {
    setChartType(newChartType);
  };

  const chartData = chartType === 'week' ? dataByWeek : dataByMonth;
  const ChartComponent = chartType === 'week' ? LineChart : BarChart;

  return (
    <div className="earnings-chart-container">
      <div className="chart-toggle">
        <button
          className={`chart-button ${chartType === 'week' ? 'active' : ''}`}
          onClick={() => handleChartTypeChange('week')}
        >
          Par Semaine
        </button>
        <button
          className={`chart-button ${chartType === 'month' ? 'active' : ''}`} 
          onClick={() => handleChartTypeChange('month')}
        >
          Par mois
        </button>
      </div>
      <ChartComponent width={600} height={300} data={chartData}>
        <XAxis dataKey={chartType === 'week' ? 'week' : 'month'} />
        <YAxis />
        <Tooltip />
        <Legend />
        {chartType === 'week' ? (
          <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
        ) : (
          <Bar dataKey="earnings" fill="#8884d8" />
        )}
      </ChartComponent>
    </div>
  );
};

export default EarningsChart;
