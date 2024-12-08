import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

const UpdateExercise = () => {
  const location = useLocation();
  const { exercise } = location.state || {};

  const [exerciseData, setExerciseData] = useState({
    eid: '',
    exerciseType: '',
    calorieBurn: '',
    imageName: '',
    imageType: '',
    image: '',
    numberofmin: '',
  });


  useEffect(() => {
    if (exercise) {
      setExerciseData({
        eid: exercise.eid || '',
        exerciseType: exercise.exerciseType || '',
        calorieBurn: exercise.calorieBurn || '',
        imageName: exercise.imageName || '',
        imageType: exercise.imageType || '',
        image: exercise.imageData
          ? `data:${exercise.imageType};base64,${exercise.imageData}`
          : '',
          numberofmin: exercise.numberofmin || '',
      });
    }
  }, [exercise]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  
  const updateDuration = () => {
    if (exercise) {
      setExerciseData({
        eid: exercise.eid,
        exerciseType: exercise.exerciseType || '',
        calorieBurn: exercise.calorieBurn || '',
        image: exercise.imageData
          ? `data:${exercise.imageType};base64,${exercise.imageData}`
          : '',
        numberofmin: exercise.numberofmin || '',
      });
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { exerciseType, calorieBurn, numberofmin, eid } = exerciseData;
    if (!exerciseType || !calorieBurn || !numberofmin) {
      alert('Please fill in all required fields.');
      return;
    }


  

    try {
      const userResponse = await axios.get(
        `http://localhost:8080/user/getuserdata/${localStorage.getItem('user')}`
      );

      const preparedData = {
        uid:userResponse.data.uid,
        eid:exercise.eid,
        numberofmin: exerciseData.numberofmin,
        exerciseType:exercise.exerciseType,
      };

      console.log(preparedData)

      const response = await axios.post(
        'http://localhost:8080/userexercise/updateexercise',
        preparedData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      alert(response.data.message || 'Exercise updated successfully!');
    } catch (error) {
      console.error('Error updating exercise:', error);
      alert(error.response?.data?.message || 'Failed to update exercise. Please try again.');
    }
  };

  
  useEffect(() => {
    updateDuration()
  }, [location.state]);

  return (
    <div style={styles.form}>
      <h2 style={styles.heading}>Update Exercise</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {exerciseData.image && (
          <div style={styles.fieldContainer}>
            <img
              src={exerciseData.image}
              alt="Previous exercise"
              style={styles.imagePreview}
            />
          </div>
        )}

        <div style={styles.fieldContainer}>
          <label htmlFor="exerciseType" style={styles.label}>
            Exercise Type:
          </label>
          <input
            id="exerciseType"
            style={styles.input}
            type="text"
            name="exerciseType"
            value={exerciseData.exerciseType}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.fieldContainer}>
          <label htmlFor="calorieBurn" style={styles.label}>
            Calories Burned:
          </label>
          <input
            id="calorieBurn"
            style={styles.input}
            type="number"
            name="calorieBurn"
            value={exerciseData.calorieBurn}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.fieldContainer}>
          <label htmlFor="numberofmin" style={styles.label}>
            Duration (minutes):
          </label>
          <input
            id="numberofmin"
            style={styles.input}
            type="number"
            name="numberofmin"
            value={exerciseData.numberofmin}
            onChange={handleChange}
            required
          />
        </div>

        <button style={styles.button} type="submit">
          Update Exercise
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
    padding: '2.5rem',
    background: 'linear-gradient(145deg, #f4f7f6, #e6eaf0)',
    borderRadius: '16px',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(0, 0, 0, 0.06)',
    maxWidth: '500px',
    margin: '2rem auto',
    fontFamily: "'Inter', 'Roboto', sans-serif",
    border: '1px solid rgba(255, 255, 255, 0.18)',
    transition: 'transform 0.3s ease',
  },
  heading: {
    marginBottom: '2rem',
    fontSize: '2.2rem',
    fontWeight: '800',
    color: '#2c3e50',
    textAlign: 'center',
    letterSpacing: '-0.05em',
    background: 'linear-gradient(45deg, #3498db, #2980b9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  fieldContainer: {
    marginBottom: '1.5rem',
    width: '100%',
    position: 'relative',
  },
  label: {
    display: 'block',
    marginBottom: '0.7rem',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#34495e',
    transition: 'color 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '0.85rem 1.2rem',
    border: '2px solid transparent',
    borderRadius: '10px',
    fontSize: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    outline: 'none',
  },
  button: {
    padding: '0.9rem 1.8rem',
    border: 'none',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #3498db, #2980b9)',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 20px rgba(52, 152, 219, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    position: 'relative',
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
    transition: 'transform 0.3s ease',
  },
};

export default UpdateExercise;
