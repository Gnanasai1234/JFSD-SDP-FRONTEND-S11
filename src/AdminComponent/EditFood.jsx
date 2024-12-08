import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';


const EditFood = () => {

  const location = useLocation();
  const {food} = location.state||{};
  const [foodData, setFoodData] = useState({
    fid:'',
    name: '',
    calories: '',
    fat: '',
    protein: '',
    carbohydrates: '',
  });

  const [imageFile, setImageFile] = useState();

  const setfood=()=>{
    // console.log(food);
    if (food) {
      setFoodData({
        fid:food.fid,
        name: food.name || '',
        calories: food.calories || '',
        fat: food.fat || '',
        protein: food.protein || '',
        carbohydrates: food.carbohydrates || '',
        image:`data:${food.imageType};base64,${food.imageData}`||''
      });
    }
  }

  useEffect(() => {
    setfood()
  }, [food]); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 20 * 1024 * 1024) {
        alert('Please select an image smaller than 20MB.');
        setImageFile(null);
        return;
      }
      setImageFile(file);
    } else {
      alert('Please select a valid image file (JPEG, PNG, etc.).');
      setImageFile(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !foodData.name ||
      !foodData.calories ||
      !foodData.fat ||
      !foodData.protein ||
      !foodData.carbohydrates
    ) {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Prepare FormData
    const formData = new FormData();
    formData.append(
      'food',
      new Blob([JSON.stringify(foodData)], { type: 'application/json' })
    );
  
    // Append new image file if selected, else rely on previous image
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    try {
      // Send the request to the backend
      const response = await axios.post('http://localhost:8080/food/editfood', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      alert(response.data.message || 'Food item edited successfully!');
    } catch (error) {
      console.error('There was an error editing the food item!', error);
      alert(error.response?.data?.message || 'Failed to edit food item. Please try again.');
    }
  };
  
  return (
    <div style={styles.form}>
      <h2 style={styles.heading}>Edit Food</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div style={styles.fieldContainer}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            id="name"
            style={styles.input}
            type="text"
            name="name"
            value={foodData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="calories" style={styles.label}>Calories:</label>
          <input
            id="calories"
            style={styles.input}
            type="number"
            name="calories"
            value={foodData.calories}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="fat" style={styles.label}>Fat:</label>
          <input
            id="fat"
            style={styles.input}
            type="number"
            name="fat"
            value={foodData.fat}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="protein" style={styles.label}>Protein:</label>
          <input
            id="protein"
            style={styles.input}
            type="number"
            name="protein"
            value={foodData.protein}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="carbohydrates" style={styles.label}>Carbohydrates:</label>
          <input
            id="carbohydrates"
            style={styles.input}
            type="number"
            name="carbohydrates"
            value={foodData.carbohydrates}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
        {foodData.image && (
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Previous Image:</label>
            <img
              src={foodData.image}
              alt="Previous food"
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
            />
          </div>
        )}

        
        <div style={styles.fieldContainer}>
          <label htmlFor="image" style={styles.label}>
            New Image:
          </label>
          <input
            id="image"
            style={{ ...styles.input, marginBottom: '1.5rem' }}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        </div>
        <button style={styles.button} type="submit">
          Edit Food
        </button>
      </form>
    </div>
  );
};



const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '2rem auto',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
  },
  fieldContainer: {
    marginBottom: '1rem',
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    fontSize: '1rem',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    backgroundColor: '#f9f9f9',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default EditFood;
