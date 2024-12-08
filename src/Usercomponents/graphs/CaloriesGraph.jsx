import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Flame } from 'lucide-react';
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

// Register Chart.js components globally
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

export default function CaloriesGraph({ data }) {
  const { breakfastSums, dinnerSums, lunchSums, snacksSums } = data;
  const [selectedNutrient, setSelectedNutrient] = useState('calories');

  // Meal-specific colors for more informative visualization
  const mealColors = {
    breakfast: {
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    lunch: {
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    },
    dinner: {
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
    },
    snacks: {
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }
  };

  const caloriesData = [
    breakfastSums.calories,
    lunchSums.calories,
    dinnerSums.calories,
    snacksSums.calories,
  ];

  const totalCalories = 
    breakfastSums.calories + 
    snacksSums.calories + 
    lunchSums.calories + 
    dinnerSums.calories;

  const chartData = {
    labels: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    datasets: [
      {
        label: 'Calories per Meal',
        data: caloriesData,
        borderColor: [
          mealColors.breakfast.borderColor,
          mealColors.lunch.borderColor,
          mealColors.dinner.borderColor,
          mealColors.snacks.borderColor
        ],
        backgroundColor: [
          mealColors.breakfast.backgroundColor,
          mealColors.lunch.backgroundColor,
          mealColors.dinner.backgroundColor,
          mealColors.snacks.backgroundColor
        ],
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        callbacks: {
          label: (context) => {
            const meal = ['Breakfast', 'Lunch', 'Dinner', 'Snack'][context.dataIndex];
            return `${meal}: ${context.parsed.y} kcal`;
          }
        }
      },
      title: {
        display: true,
        text: 'Calories Intake Throughout the Day',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Arial, sans-serif'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Calories (kcal)',
          font: {
            size: 12
          }
        }
      }
    }
  };

  const containerStyle = {
    backgroundColor: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif'
  };

  const totalCaloriesStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333'
  };

  const graphStyle = {
    height: '350px',
    width: '100%',
    position: 'relative',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <div style={totalCaloriesStyle}>
        <Flame color="#ff6b6b" size={24} style={{ marginRight: '10px' }} />
        Total Caloric Intake: {totalCalories} kcal
      </div>
      <div style={graphStyle}>
        <Line 
          data={chartData} 
          options={options} 
          aria-label="Calories intake graph showing distribution across meals"
        />
      </div>
    </div>
  );
}