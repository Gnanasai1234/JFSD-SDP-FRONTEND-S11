import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';
import PieChart from './../Usercomponents/graphs/PieChart';
import ExerciseGraph from './../Usercomponents/graphs/ExerciseGraph';
import ProteinGraph from './../Usercomponents/graphs/Proteingraph';
import CarbohydratesGraph from './../Usercomponents/graphs/CarbohydratesGraph';
import FatGraph from './../Usercomponents/graphs/FatGraphs';
import CaloriesGraph from './../Usercomponents/graphs/CaloriesGraph';
import { useLocation } from 'react-router';

export default function ViewUserDiet() {
  const [diet, setDiet] = useState([]);
  const [breakfastSums, setBreakfastSums] = useState({});
  const [dinnerSums, setDinnerSums] = useState({});
  const [lunchSums, setLunchSums] = useState({});
  const [snacksSums, setSnacksSums] = useState({});
  const [exerciseTypes, setExerciseTypes] = useState([]);
  const [exerciseTypeSummary, setExerciseTypeSummary] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [suggestions, setSuggestions] = useState([]);

  const graphsContainerRef = useRef(null);


  const location = useLocation();
  const { rowid } = location.state || {};
  
  const nutrientLimits = {
  calories: { min: 1800, max: 2200 },
  protein: { min: 50, max: 70 },
  fat: { min: 50, max: 70 },
  carbohydrates: { min: 225, max: 325 },
};

  const dashboardStyle = {
    marginTop: '45px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    opacity: 0.9,
    transition: 'opacity 0.5s ease',
  };

  const headerStyle = {
    textAlign: 'left',
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '20px',
    transition: 'color 0.3s ease',
  };

  const graphContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: '20px',
    gap: '20px',
    flexWrap: 'wrap',
  };
  const suggestionsBoxStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    marginBottom: '20px',
  };

  const graphStyle = {
    flex: '1 1 45%',
    opacity: 0.95,
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    transform: 'scale(1)',
  };

  const downloadButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    gap: '8px',
    transition: 'background-color 0.3s ease',
  };

  const headerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const downloadGraphs = async () => {
    if (!graphsContainerRef.current) return;

    try {
      const canvas = await html2canvas(graphsContainerRef.current, {
        scale: 2, 
        useCORS: true, 
        allowTaint: true,
      });

      const image = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.download = `nutrition_dashboard_${date}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error('Error downloading graphs:', error);
      alert('Failed to download graphs. Please try again.');
    }
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.opacity = '1';
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.opacity = '0.95';
    e.currentTarget.style.transform = 'scale(1)';
  };

  const fetchData = async () => {
    try {
      const username = localStorage.getItem('user');
      if (!username) {
        console.error("Username not found in localStorage");
        return;
      }

    //   const userdata = await axios.get(`http://localhost:8080/user/getuserdata/${username}`);
      const response = await axios.get(`http://localhost:8080/diet/getuserdiet/${rowid}/${date}`);
      setDiet(response.data);
    } catch (error) {
      console.error("Error fetching data:", error); 
      alert(`Failed to fetch data: ${error.response?.statusText || error.message}`);
    }
  };

  const fetchExercise = async () => { 
    try {
      const username = localStorage.getItem('user');
      if (!username) {
        console.error("Username not found in localStorage");
        return;
      }
  
      const response = await axios.get(`http://localhost:8080/userexercise/getExercise/${rowid}`);
      const exerciseData = response.data;
  
      const summary = exerciseData.reduce((acc, exercise) => {
        const { exerciseType, calorieBurn, numberofmin } = exercise;
  
        if (!acc[exerciseType]) {
          acc[exerciseType] = {
            totalCaloriesBurned: 0,
            totalDuration: 0,
            count: 0
          };
        }
  
        acc[exerciseType].totalCaloriesBurned += calorieBurn;
        acc[exerciseType].totalDuration += numberofmin;
        acc[exerciseType].count += 1;
  
        return acc;
      }, {});
  
      console.log("Detailed Summary by Exercise Type:", summary);
  
      const grandTotals = Object.values(summary).reduce(
        (totals, typeSummary) => {
          totals.totalCaloriesBurned += typeSummary.totalCaloriesBurned;
          totals.totalDuration += typeSummary.totalDuration;
          return totals;
        },
        { totalCaloriesBurned: 0, totalDuration: 0 }
      );
  
      console.log("Grand Totals:", grandTotals);
  
      setExerciseTypeSummary(summary);
      const uniqueTypes = [...new Set(exerciseData.map(exercise => exercise.exerciseType))];
      setExerciseTypes(uniqueTypes);

      console.log("Exercise Data ",exerciseData)
  
    } catch (error) {
      console.error("Error in fetchExercise:", error);
      alert(`Failed to fetch exercise data: ${error.response?.statusText || error.message}`);
    }
  };
  

  const calculateSums = (data) => {
    return data.reduce(
      (totals, item) => ({
        calories: totals.calories + item.calories,
        fat: totals.fat + item.fat,
        protein: totals.protein + item.protein,
        carbohydrates: totals.carbohydrates + item.carbohydrates,
      }),
      { calories: 0, fat: 0, protein: 0, carbohydrates: 0 }
    );
  };

  const setData = () => {
    const breakfastData = diet.filter(item => item.mealType === 'Breakfast');
    const dinnerData = diet.filter(item => item.mealType === 'Dinner');
    const lunchData = diet.filter(item => item.mealType === 'Lunch');
    const snacksData = diet.filter(item => item.mealType === 'snacks');
   
    setBreakfastSums(calculateSums(breakfastData));
    setDinnerSums(calculateSums(dinnerData));
    setLunchSums(calculateSums(lunchData));
    setSnacksSums(calculateSums(snacksData));
  };

  const totalCalories = breakfastSums.calories + lunchSums.calories + dinnerSums.calories + snacksSums.calories;
  const totalFat = breakfastSums.fat + lunchSums.fat + dinnerSums.fat + snacksSums.fat;
  const totalProtein = breakfastSums.protein + lunchSums.protein + dinnerSums.protein + snacksSums.protein;
  const totalCarbohydrates = breakfastSums.carbohydrates + lunchSums.carbohydrates + dinnerSums.carbohydrates + snacksSums.carbohydrates;

  const handleDateChange = (event) => {
    setDate(event.target.value); 
  };

  const generateSuggestions = () => {
    const totals = { calories: totalCalories, fat: totalFat, protein: totalProtein, carbohydrates: totalCarbohydrates };
    const newSuggestions = [];

    Object.keys(nutrientLimits).forEach((nutrient) => {
      if (totals[nutrient] > nutrientLimits[nutrient].max) {
        newSuggestions.push(`🔴 Reduce ${nutrient} intake. Exceeded by ${totals[nutrient] - nutrientLimits[nutrient].max} units.`);
      } else if (totals[nutrient] < nutrientLimits[nutrient].min) {
        newSuggestions.push(`🟢 Increase ${nutrient} intake. Short by ${nutrientLimits[nutrient].min - totals[nutrient]} units.`);
      }
    });

    if (newSuggestions.length === 0) {
      newSuggestions.push("✅ Your diet is balanced today. Keep it up!");
    }

    setSuggestions(newSuggestions);
  };
  useEffect(() => {
    generateSuggestions();
  }, [totalCalories, totalFat, totalProtein, totalCarbohydrates]);

  
  useEffect(() => {
    fetchData();
    fetchExercise()
  }, []);

  useEffect(() => {
    if (diet.length > 0) {
      setData();
    }
  }, [diet]);

  useEffect(()=>{
    fetchData()
  },[date])
  

  return (
    <div style={dashboardStyle}>
      <div style={headerContainerStyle}>

    <div style={suggestionsBoxStyle}>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} style={{ color: suggestion.includes("Reduce") ? "red" : "green" }}>
              {suggestion}
            </li>
          ))}
        </ul>
      </div>


        <div>
          <p>Date: {date}</p>
          <h3 style={headerStyle}>Hello {localStorage.getItem("user")}, View your Analysis</h3>
          <input
            type="date"
            id="date"
            name="date"
            value={date} 
            onChange={handleDateChange} 
          />
        </div>
        <button 
          style={downloadButtonStyle} 
          onClick={downloadGraphs}
          title="Download Graphs"
        >
          <Download size={24} /> Download Graphs
        </button>
      </div>

      <div ref={graphsContainerRef} style={graphContainerStyle}>
        <div
          style={graphStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <PieChart
            data={{
              calories: totalCalories,
              fat: totalFat,
              protein: totalProtein,
              carbohydrates: totalCarbohydrates,
            }}
          />
        </div>
        <div
          style={graphStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ExerciseGraph data={{
            summary: exerciseTypeSummary
          }}/>
        </div>
        <div
          style={graphStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ProteinGraph data={{ breakfastSums, dinnerSums, lunchSums, snacksSums }} />
        </div>
        <div
          style={graphStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarbohydratesGraph data={{ breakfastSums, dinnerSums, lunchSums, snacksSums }} />
        </div>
        <div
          style={graphStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FatGraph data={{ breakfastSums, dinnerSums, lunchSums, snacksSums }} />
        </div>
        <div
          style={graphStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CaloriesGraph data={{ breakfastSums, dinnerSums, lunchSums, snacksSums }} />
        </div>
      </div>
    </div>
  );
}