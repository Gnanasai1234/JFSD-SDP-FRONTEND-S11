import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function FatGraph({ data }) {
  const { breakfastSums, dinnerSums, lunchSums, snacksSums } = data;

  const fatData = [
    breakfastSums.fat,
    lunchSums.fat,
    dinnerSums.fat,
    snacksSums.fat

  ];

  const totalFat =breakfastSums.fat+ snacksSums.fat+lunchSums.fat+dinnerSums.fat;

  // Chart data for fats intake
  const chartData = {
    labels: ["Breakfast", "Lunch", "Dinner", "Snack"],
    datasets: [
      {
        label: "Fats (g)",
        data: fatData,
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Fats Intake Throughout the Day',
      },
    },
  };

  // Inline styles for the graph container and components
  const graphContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '800px',
    height: '400px',
    textAlign: 'left',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    marginBottom: '20px',
  };

  const totalStyle = {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '10px',
  };

  const graphStyle = {
    transition: 'transform 0.3s ease',
    height: '300px',
    width: '100%',
  };

  return (
    <div style={graphContainerStyle}>
      <h3 style={titleStyle}>Fats Graph</h3>
      <div style={totalStyle}>Total Fat Intake: {totalFat} g</div>
      <div style={graphStyle}>
        <Line data={chartData} options={options} height={300} />
      </div>
    </div>
  );
}
