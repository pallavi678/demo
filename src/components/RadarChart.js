import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title } from 'chart.js';
import './radar.css'; // Import the CSS file

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title);

const RadarChart = ({ data }) => {
  const chartData = {
    labels: data.labels || [],
    datasets: [
      {
        label: 'Intensity',
        data: data.intensity || [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Likelihood',
        data: data.likelihood || [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Relevance',
        data: data.relevance || [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
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
        text: 'Radar Chart of Intensity, Likelihood, and Relevance by Topic',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
  };

  return (
    <div className="chart-container">
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
