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

export default function CaloriesGraph() {
  const data = {
    labels: ["Breakfast", "Morning Snack", "Lunch", "Afternoon Snack", "Dinner"],
    datasets: [
      {
        label: "Calories",
        data: [300, 150, 600, 200, 500],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // Calculate total calorie intake
  const totalCalories = data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio maintenance
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Calories Intake Throughout the Day',
      },
    },
  };

  // Inline CSS for styling the graph component
  const graphContainerStyle = {
    display: 'flex',
    flexDirection: 'column', // Use column to stack elements vertically
    justifyContent: 'flex-start', // Aligns items at the top
    alignItems: 'flex-start', // Aligns items to the left
    position: 'relative',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%', 
    height: '400px', // Set a specific height
    textAlign: 'left', // Align text to the left
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
    height: '300px', // Set height for the graph
    width: '100%', // Ensure the graph takes full width of the container
  };

  return (
    <div style={graphContainerStyle}>
      <h3 style={titleStyle}>Calories Graph</h3>
      <div style={totalStyle}>Total Caloric Intake: {totalCalories} kcal</div>
      <div style={graphStyle}>
        <Line data={data} options={options} height={300} />
      </div>
    </div>
  );
}
