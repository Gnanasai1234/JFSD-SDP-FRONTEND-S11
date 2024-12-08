import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data }) {
  const { calories, protein, carbohydrates, fat } = data;

  const chartData = {
    labels: ['Calories', 'Protein', 'Carbohydrates', 'Fats'],
    datasets: [
      {
        label: 'Nutritional Breakdown',
        data: [calories, protein, carbohydrates, fat], 
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
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
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
