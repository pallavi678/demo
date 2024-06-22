// LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.years || [],
    datasets: [
      {
        label: 'Trends Over Time',
        data: data.values || [],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly Trends',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} width={800} height={600} />
    </div>
  );
};

export default LineChart;
