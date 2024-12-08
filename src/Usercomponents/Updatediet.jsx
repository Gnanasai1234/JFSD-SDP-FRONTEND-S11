import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const UpdateDiet = () => {
  const location = useLocation();
  const { food } = location.state || {};

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fixedFood = {
    fid: food?.fid || '',
    name: food?.name || '',
    calories: food?.calories || '',
    fat: food?.fat || '',
    protein: food?.protein || '',
    carbohydrates: food?.carbohydrates || '',
  };

  const [foodData, setFoodData] = useState({
    fid: '',
    name: '',
    calories: '',
    fat: '',
    protein: '',
    carbohydrates: '',
    quantity: '',
    time: '',
  });

  const setFood = () => {
    if (food) {
      setFoodData({
        fid: food.fid,
        name: food.name || '',
        calories: food.calories || '',
        fat: food.fat || '',
        protein: food.protein || '',
        carbohydrates: food.carbohydrates || '',
        image: food.imageData
          ? `data:${food.imageType};base64,${food.imageData}`
          : '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const handleQuantity = (e) => {
    const quantity = parseFloat(e.target.value) || 0;
    setFoodData({
      ...foodData,
      quantity: e.target.value,
      calories: ((fixedFood.calories * quantity) / 100).toFixed(2),
      fat: ((fixedFood.fat * quantity) / 100).toFixed(2),
      protein: ((fixedFood.protein * quantity) / 100).toFixed(2),
      carbohydrates: ((fixedFood.carbohydrates * quantity) / 100).toFixed(2),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !foodData.name ||
      !foodData.calories ||
      !foodData.fat ||
      !foodData.protein ||
      !foodData.carbohydrates ||
      !foodData.time
    ) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields.',
        severity: 'error',
      });
      return;
    }

    try {
      const userResponse = await axios.get(
        `http://localhost:8080/user/getuserdata/${localStorage.getItem('user')}`
      );
      const preparedData = {
        uid: userResponse.data.uid,
        fid: foodData.fid,
        name: foodData.name,
        calories: foodData.calories,
        fat: foodData.fat,
        protein: foodData.protein,
        carbohydrates: foodData.carbohydrates,
        quantity: foodData.quantity,
        time: foodData.time,
      };

      const response = await axios.post(
        'http://localhost:8080/diet/updatediet',
        preparedData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      setSnackbar({
        open: true,
        message: response.data.message || 'Diet updated successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error updating diet:', error);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message || 'Failed to update diet. Please try again.',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    setFood();
  }, [location.state]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update Diet</h2>
      <div style={styles.contentWrapper}>
        {/* Image Section on the left */}
        <div style={styles.imageContainer}>
          {foodData.image && (
            <img src={foodData.image} alt="Food" style={styles.image} />
          )}
        </div>

{/* Form Section on the right */}
<div style={styles.formWrapper}>
  <form onSubmit={handleSubmit} style={styles.form}>
    {[ 
      { label: 'Name', type: 'text', name: 'name', value: foodData.name },
      { label: 'Calories', type: 'number', name: 'calories', value: foodData.calories },
      { label: 'Fat', type: 'number', name: 'fat', value: foodData.fat },
      { label: 'Protein', type: 'number', name: 'protein', value: foodData.protein },
      { label: 'Carbohydrates', type: 'number', name: 'carbohydrates', value: foodData.carbohydrates },
      { label: 'Quantity', type: 'number', name: 'quantity', value: foodData.quantity },
      { label: 'Time', type: 'time', name: 'time', value: foodData.time },
    ].map((field, index) => (
      <div key={index} style={styles.inputGroup}>
        <label htmlFor={field.name} style={styles.label}>
          {field.label}:
        </label>
        <input
          id={field.name}
          type={field.type}
          name={field.name}
          value={field.value}
          onChange={field.name === 'quantity' ? handleQuantity : handleChange}
          style={styles.input}
          required
        />
      </div>
    ))}
    <button type="submit" style={styles.button}>
      Update Diet
    </button>
  </form>
</div>
</div>

<Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
<Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
  {snackbar.message}
</Alert>
</Snackbar>
</div>
);
};

const styles = {
container: {
maxWidth: '1200px',
margin: '2rem auto',
padding: '2rem',
background: 'linear-gradient(145deg, #ffffff, #f4f4f4)',
borderRadius: '20px',
boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)', // More intense, deep shadow for 3D effect
fontFamily: 'Arial, sans-serif',
},
heading: {
fontSize: '2rem',
fontWeight: 'bold',
color: '#333',
marginBottom: '1rem',
textAlign: 'center',
},
contentWrapper: {
display: 'flex',
alignItems: 'flex-start',
justifyContent: 'space-between', // Transpose positions
gap: '2rem',
},
formWrapper: {
flex: 1,
display: 'flex',
flexDirection: 'column',
justifyContent: 'flex-start', // Align input fields to the top
},
imageContainer: {
flex: 1,
maxWidth: '800px',
height: '100%', // Ensure full height
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
paddingTop: '45px',
},
image: {
width: '100%',
height: 'auto', // To ensure full height while maintaining aspect ratio
borderRadius: '12px',
boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
},
form: {
display: 'flex',
flexDirection: 'column',
width: '100%',
maxWidth: '500px',
},
inputGroup: {
marginBottom: '1rem',
width: '100%',
},
label: {
display: 'block',
marginBottom: '0.5rem',
fontWeight: '600',
color: '#666',
},
input: {
width: '100%',
padding: '0.75rem',
fontSize: '1rem',
borderRadius: '8px',
border: '1px solid #ddd',
boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
},
button: {
width: '525px',
backgroundColor: '#3498db',
color: '#fff',
padding: '0.75rem 1.5rem',
fontSize: '1rem',
border: 'none',
borderRadius: '8px',
cursor: 'pointer',
marginTop: '1rem',
transition: 'background-color 0.3s ease',
},
};

export default UpdateDiet;