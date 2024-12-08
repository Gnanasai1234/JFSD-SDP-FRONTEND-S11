import React, { useEffect, useState, useRef } from 'react';
import Proteingraph from './graphs/Proteingraph';
import CaloriesGraph from './graphs/CaloriesGraph';
import CarbohydratesGraph from './graphs/CarbohydratesGraph';
import FatGraph from './graphs/FatGraphs';
import PieChart from './graphs/PieChart';
import axios from 'axios';
import ExerciseGraph from './graphs/ExerciseGraph';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

export default function Dashboard() {
  const [diet, setDiet] = useState([]);
  const [breakfastSums, setBreakfastSums] = useState({
    calories: 0, fat: 0, protein: 0, carbohydrates: 0
  });
  const [dinnerSums, setDinnerSums] = useState({
    calories: 0, fat: 0, protein: 0, carbohydrates: 0
  });
  const [lunchSums, setLunchSums] = useState({
    calories: 0, fat: 0, protein: 0, carbohydrates: 0
  });
  const [snacksSums, setSnacksSums] = useState({
    calories: 0, fat: 0, protein: 0, carbohydrates: 0
  });
  const [exerciseTypes, setExerciseTypes] = useState([]);
  const [exerciseTypeSummary, setExerciseTypeSummary] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const graphsContainerRef = useRef(null);
  
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

  const loadingStyle = {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#666',
  };

  const errorStyle = {
    textAlign: 'center',
    color: 'red',
    padding: '20px',
    backgroundColor: '#fff0f0',
    borderRadius: '8px',
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

  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const username = localStorage.getItem('user');
      if (!username) {
        throw new Error("No username found. Please log in.");
      }

      const userResponse = await axios.get(`http://localhost:8080/user/getuserdata/${username}`);
      const userData = userResponse.data;
      
      if (!userData || !userData.uid) {
        throw new Error("Invalid user data received");
      }
      console.log("User Data",userData)

      const dietResponse = await axios.get(`http://localhost:8080/diet/getuserdiet/${userData.uid}/${date}`);
      setDiet(dietResponse.data);

      console.log(dietResponse)

      const exerciseResponse = await axios.get(`http://localhost:8080/userexercise/getExercise/${userData.uid}`);
      processExerciseData(exerciseResponse.data);

    } catch (error) {
      console.error("Data fetching error:", error);
      setError(error.message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const processExerciseData = (exerciseData) => {
    try {
      if (!exerciseData || exerciseData.length === 0) {
        console.warn("No exercise data found");
        return;
      }

      const summary = exerciseData.reduce((acc, exercise) => {
        const { exerciseType, calorieBurn = 0, numberofmin = 0 } = exercise;

        if (!exerciseType) {
          console.warn("Exercise with missing type:", exercise);
          return acc;
        }

        acc[exerciseType] = acc[exerciseType] || {
          totalCaloriesBurned: 0,
          totalDuration: 0,
          count: 0
        };

        acc[exerciseType].totalCaloriesBurned += calorieBurn;
        acc[exerciseType].totalDuration += numberofmin;
        acc[exerciseType].count += 1;

        return acc;
      }, {});

      setExerciseTypeSummary(summary);
      setExerciseTypes(Object.keys(summary));

    } catch (error) {
      console.error("Error processing exercise data:", error);
    }
  };

  const calculateSums = (data) => {
    return data.reduce(
      (totals, item) => ({
        calories: (totals.calories || 0) + (item.calories || 0),
        fat: (totals.fat || 0) + (item.fat || 0),
        protein: (totals.protein || 0) + (item.protein || 0),
        carbohydrates: (totals.carbohydrates || 0) + (item.carbohydrates || 0),
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

  

  const totalCalories = (breakfastSums.calories || 0) + (lunchSums.calories || 0) + (dinnerSums.calories || 0) + (snacksSums.calories || 0);
  const totalFat = (breakfastSums.fat || 0) + (lunchSums.fat || 0) + (dinnerSums.fat || 0) + (snacksSums.fat || 0);
  const totalProtein = (breakfastSums.protein || 0) + (lunchSums.protein || 0) + (dinnerSums.protein || 0) + (snacksSums.protein || 0);
  const totalCarbohydrates = (breakfastSums.carbohydrates || 0) + (lunchSums.carbohydrates || 0) + (dinnerSums.carbohydrates || 0) + (snacksSums.carbohydrates || 0);


  console.log(exerciseTypeSummary)

  const handleDateChange = (event) => {
    setDate(event.target.value); 
  };

  const generateSuggestions = () => {
    const totals = { 
      calories: totalCalories, 
      fat: totalFat, 
      protein: totalProtein, 
      carbohydrates: totalCarbohydrates 
    };
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
  const caloriesBurnedStyle = {
    backgroundColor: '#e6f2ff', // Softer light blue background
    border: '2px solid #4a90e2', // More vibrant border color
    borderRadius: '15px', // Slightly more rounded corners
    padding: '15px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 6px 12px rgba(74, 144, 226, 0.15)', // More pronounced shadow
    fontFamily: 'Inter, Arial, sans-serif', // Modern, clean font
    fontSize: '16px',
    color: '#2c5282',
    fontWeight: '700', // Slightly bolder text
    transition: 'all 0.3s ease',
    cursor: 'default',
    textAlign: 'center',
    minWidth: '280px',
    position: 'relative',
    overflow: 'hidden',
    transform: 'perspective(500px) translateZ(0)',
    gap: '10px', // Space between elements
    
    // Gradient background effect
    background: 'linear-gradient(145deg, #e6f2ff, #f0f9ff)',
    
    // Subtle hover effect
    ':hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 8px 15px rgba(74, 144, 226, 0.2)',
    },
    
    // Icon-like styling
    '& > span': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4a90e2',
      color: 'white',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      marginRight: '10px',
    },
    
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'linear-gradient(45deg, rgba(255,255,255,0.2), transparent)',
      transform: 'rotate(-45deg)',
      zIndex: 1,
      pointerEvents: 'none',
      opacity: 0.3,
    }
  };

 
  
 
  
  const datePickerContainerStyle = {
    flex: '1 1 30%', // Ensure alignment with the other boxes
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  };
  
  const dateStyle = {
    marginBottom: '10px',
    fontSize: '1rem',
    color: '#333',
  };
  
 
  const downloadButtonContainerStyle = {
    marginTop: '10px',
    textAlign: 'center',
    flex: '1 1 100%', // Full width for smaller screens
  };
  
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [date]);

  useEffect(() => {
    generateSuggestions();
  }, [totalCalories, totalFat, totalProtein, totalCarbohydrates]);

  useEffect(() => {
    if (diet.length > 0) {
      setData();
    }
  }, [diet]);

  if (isLoading) {
    return <div style={loadingStyle}>Loading your dashboard...</div>;
  }

  if (error) {
    return (
      <div style={errorStyle}>
        <p>Error: {error}</p>
        <button onClick={fetchUserData}>Retry Fetching</button>
      </div>
    );
  }

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
        <br/>
        {/* <div style={caloriesBurnedStyle}>
  <span>🔥</span>
  Expected Calories to be burned: 
  {totalCalories - (exerciseTypeSummary && Object.values(exerciseTypeSummary).reduce((total, exercise) => total + exercise.totalCaloriesBurned, 0))}
</div> */}
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
          <Proteingraph data={{ breakfastSums, dinnerSums, lunchSums, snacksSums }} />
          {/* {console.log()} */}
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