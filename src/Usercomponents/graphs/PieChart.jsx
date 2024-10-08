import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components globally
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  // Sample data for the pie chart
  const data = {
    labels: ['Calories', 'Protein', 'Carbohydrates', 'Fats','Sugars'],
    datasets: [
      {
        label: 'Nutritional Breakdown',
        data: [1750, 100, 240, 100,80], // Replace with your actual data
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 165, 0, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 165, 0, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Nutritional Breakdown',
      },
    },
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3>Nutritional Breakdown Pie Chart</h3>
      <div style={{ height: '400px' }}> 
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
