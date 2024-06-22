import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import PieChart from './Piechart';
import LineChart from './LineChart';
import ScatterChart from './ScatterChart';
import DoughnutChart from './DoughnutChart';
import RadarChart from './RadarChart';
import './Dashboard.css'
function Dashboard() {
  const [barData, setBarData] = useState({ intensity: [], likelihood: [] });
  const [pieData, setPieData] = useState({ labels: [], values: [] });
  const [lineData, setLineData] = useState({ years: [], values: [] });
  const [scatterData, setScatterData] = useState([]);
  const [doughnutData, setDoughnutData] = useState({ labels: [], values: [] });
  const [radarData, setRadarData] = useState({ labels: [], intensity: [], likelihood: [], relevance: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const val = await response.json();

        // Filter out entries without a likelihood value
        const filteredData = val.filter(item => item.likelihood);

        // Process data for BarChart: Use limited data
        const barChartData = filteredData.slice(0, 20);
        const intensity = barChartData.map(item => item.intensity);
        const likelihood = barChartData.map(item => item.likelihood);

        // Process data for PieChart: Distribution of topics by region/country
        const regionCounts = filteredData.reduce((acc, item) => {
          if (item.region) {
            acc[item.region] = (acc[item.region] || 0) + 1;
          }
          return acc;
        }, {});

        const labels = Object.keys(regionCounts);
        const values = Object.values(regionCounts);

        // Process data for LineChart: Yearly trends
        const yearlyData = filteredData.reduce((acc, item) => {
          const year = new Date(item.added).getFullYear();
          if (year) {
            if (acc[year]) {
              acc[year]++;
            } else {
              acc[year] = 1;
            }
          }
          return acc;
        }, {});

        // Extract years and sort them in descending order
        const years = Object.keys(yearlyData).sort((a, b) => b - a);
        const yearValues = years.map(year => yearlyData[year]);

        // Process data for ScatterChart
        const scatterChartData = filteredData.map(item => ({
          label: item.region,
          data: [{ x: item.intensity, y: item.likelihood }], // Ensure the fields exist in your data
        }));

        // Process data for DoughnutChart: Distribution of topics
        const topicCounts = filteredData.reduce((acc, item) => {
          if (item.topic) {
            acc[item.topic] = (acc[item.topic] || 0) + 1;
          }
          return acc;
        }, {});

        // Get top 10 topics
        const sortedTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);
        const topTopics = sortedTopics.slice(0, 10);
        const doughnutLabels = topTopics.map(([key]) => key);
        const doughnutValues = topTopics.map(([, value]) => value);

        // Process data for RadarChart: Average Intensity, Likelihood, and Relevance by Topic
        const topicAverages = filteredData.reduce((acc, item) => {
          if (item.topic) {
            if (!acc[item.topic]) {
              acc[item.topic] = { intensity: 0, likelihood: 0, relevance: 0, count: 0 };
            }
            acc[item.topic].intensity += item.intensity;
            acc[item.topic].likelihood += item.likelihood;
            acc[item.topic].relevance += item.relevance;
            acc[item.topic].count += 1;
          }
          return acc;
        }, {});

        const radarLabels = Object.keys(topicAverages).slice(0, 10);
        const radarIntensity = radarLabels.map(topic => (topicAverages[topic].intensity / topicAverages[topic].count).toFixed(2));
        const radarLikelihood = radarLabels.map(topic => (topicAverages[topic].likelihood / topicAverages[topic].count).toFixed(2));
        const radarRelevance = radarLabels.map(topic => (topicAverages[topic].relevance / topicAverages[topic].count).toFixed(2));

        // Update state with the extracted arrays
        setBarData({ intensity, likelihood });
        setPieData({ labels, values });
        setLineData({ years, values: yearValues });
        setScatterData(scatterChartData);
        setDoughnutData({ labels: doughnutLabels, values: doughnutValues });
        setRadarData({ labels: radarLabels, intensity: radarIntensity, likelihood: radarLikelihood, relevance: radarRelevance });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-cont">
      <div className='bar'>
        <BarChart data={barData} />
      </div>
      <div>
        <PieChart data={pieData} />
      </div>
      <div>
        <LineChart data={lineData} />
      </div>
      <div>
        <RadarChart data={radarData} />
      </div>
      <div>
        <DoughnutChart data={doughnutData} />
      </div>  
      <div>
        <ScatterChart data={scatterData} />
      </div>
  
    </div>
  );
}

export default Dashboard;
