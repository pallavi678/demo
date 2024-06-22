import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip } from 'chart.js';

Chart.register(LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip);

const BarChart = ({ data }) => {
  const labels = data.intensity || [];
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Liklihood',
        data: data.likelihood || [],
        backgroundColor: 'pink',
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
        text: 'Intensity vs Likelihood',
      },
    },
  };

  return (
    <div>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default BarChart;
