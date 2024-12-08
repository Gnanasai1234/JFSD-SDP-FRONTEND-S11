import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ExerciseGraph({ data }) {
  useEffect(() => {
    console.log('ExerciseGraph Data:', data);
  }, [data]);

  if (!data || !data.summary) {
    return <div>No exercise data available</div>;
  }

  // Extract labels (exercise types) and data (totalCaloriesBurned and totalDuration)
  const labels = Object.keys(data.summary);
  const totalCaloriesBurnedData = labels.map(
    type => data.summary[type]?.totalCaloriesBurned || 0
  );
  const totalDurationData = labels.map(
    type => data.summary[type]?.totalDuration || 0
  );

  // Chart.js configuration
  const chartData = {
    datasets: [
      {
        label: 'Exercise Data',
        data: labels.map((type, index) => ({
          x: totalCaloriesBurnedData[index],
          y: totalDurationData[index],
          label: type,
        })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Calories Burned vs Duration' },
    },
    scales: {
      x: { title: { display: true, text: 'Calories Burned' } },
      y: { title: { display: true, text: 'Duration (Minutes)' } },
    },
  };
  

  if (
    totalCaloriesBurnedData.every(value => value === 0) &&
    totalDurationData.every(value => value === 0)
  ) {
    return <div>No exercise data to display</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h3>Exercise Metrics Comparison</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
}
