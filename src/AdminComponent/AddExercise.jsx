import React, { useState } from 'react';
import axios from 'axios';

const AddExercise = () => {
  const [exerciseData, setExerciseData] = useState({
    exerciseType: '',
    calorieBurn: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({
      ...exerciseData,
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

    if (!exerciseData.exerciseType || !exerciseData.calorieBurn) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    const exercise = {
      exerciseType: exerciseData.exerciseType,
      calorieBurn: exerciseData.calorieBurn,
    };
    formData.append('exercise', new Blob([JSON.stringify(exercise)], { type: 'application/json' }));

    if (imageFile) formData.append('image', imageFile);

    try {
      const response = await axios.post('http://localhost:8080/exercise/addexercise', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setExerciseData({
        exerciseType: '',
        calorieBurn: '',
      });
      alert(response.data.message || 'Exercise item added successfully!');
      setImageFile(null);
    } catch (error) {
      console.error('There was an error adding the exercise item!', error);
      alert(error.response?.data?.message || 'Failed to add exercise item. Please try again.');
    }
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #f4f4f9;
            color: #333;
          }
        `}
      </style>
      <div style={styles.form}>
        <h2 style={styles.heading}>Add Exercise</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            style={styles.input}
            type="text"
            name="exerciseType"
            placeholder="Exercise Type"
            value={exerciseData.exerciseType}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="number"
            name="calorieBurn"
            placeholder="Calorie Burn"
            value={exerciseData.calorieBurn}
            onChange={handleChange}
            required
          />
          <div style={styles.fileInputWrapper}>
            <label style={styles.fileLabel}>Exercise Image</label>
            <input
              style={styles.fileInput}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button
            style={styles.button}
            type="submit"
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}  // Hover effect
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}  // Remove hover effect
          >
            Add Exercise
          </button>
        </form>
      </div>
    </>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    maxWidth: '500px',
    margin: '2rem auto',
    background: 'linear-gradient(145deg, #ffffff, #f9f9f9)',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    marginBottom: '1.2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#f9f9f9',
    transition: 'border-color 0.3s ease, background-color 0.3s ease',
    boxSizing: 'border-box',
  },
  button: {
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'transform 0.3s ease', // Added the scale effect transition
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  fileInputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
    width: '100%',
  },
  fileLabel: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  fileInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box',
    marginBottom: '1.2rem',
  },
};

export default AddExercise;