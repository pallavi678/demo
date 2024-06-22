// ScatterChart.jsx
import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, ScatterController, PointElement, Tooltip, Legend, Title, LinearScale } from 'chart.js';
import './scatter.css'; // Import the CSS file for scatter chart

Chart.register(ScatterController, PointElement, Tooltip, Legend, Title, LinearScale);

const ScatterChart = ({ data }) => {
  const chartData = {
    datasets: data.map((item, index) => ({
      label: item.label,
      data: item.data,
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      borderWidth: 1,
    })),
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Scatter Chart of Regions and Countries',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'X-Axis Label',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Y-Axis Label',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container">
      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default ScatterChart;
