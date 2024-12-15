import React, { useState } from 'react';
import axios from 'axios';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

const AddExercise = () => {
  const [exerciseData, setExerciseData] = useState({
    exerciseType: '',
    calorieBurn: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({
      ...exerciseData,
      [name]: value,
    });
    // Clear specific field error when user starts typing
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors.image;
      return newErrors;
    });

    if (file && file.type.startsWith('image/')) {
      if (file.size > 20 * 1024 * 1024) {
        setErrors(prevErrors => ({
          ...prevErrors,
          image: 'Image must be smaller than 20MB'
        }));
        setImageFile(null);
        return;
      }
      setImageFile(file);
    } else if (file) {
      setErrors(prevErrors => ({
        ...prevErrors,
        image: 'Please select a valid image file (JPEG, PNG, etc.)'
      }));
      setImageFile(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check required fields
    Object.entries(exerciseData).forEach(([key, value]) => {
      if (!value.toString().trim()) {
        newErrors[key] = `${key === 'exerciseType' ? 'Exercise Type' : 'Calorie Burn'} is required`;
      }
    });

    // Image validation
    if (!imageFile) {
      newErrors.image = 'Please upload an exercise image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null);

    if (!validateForm()) {
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
      const response = await axios.post('https://backendapp-production-8749.up.railway.app/exercise/addexercise', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Reset form
      setExerciseData({
        exerciseType: '',
        calorieBurn: '',
      });
      setImageFile(null);
      setErrors({});
      
      // Set success status
      setSubmissionStatus({
        type: 'success',
        message: response.data.message || 'Exercise item added successfully!'
      });
    } catch (error) {
      console.error('There was an error adding the exercise item!', error);
      setSubmissionStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to add exercise item. Please try again.'
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.heading}>Add Exercise</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Exercise Type Input */}
          <div style={styles.inputGroup}>
            <input
              style={{
                ...styles.input,
                borderColor: errors.exerciseType ? '#ff6b6b' : '#ddd'
              }}
              type="text"
              name="exerciseType"
              placeholder="Exercise Type"
              value={exerciseData.exerciseType}
              onChange={handleChange}
            />
            {errors.exerciseType && (
              <div style={styles.errorMessage}>
                <XCircle size={16} color="#ff6b6b" style={styles.errorIcon} />
                {errors.exerciseType}
              </div>
            )}
          </div>

          {/* Calorie Burn Input */}
          <div style={styles.inputGroup}>
            <input
              style={{
                ...styles.input,
                borderColor: errors.calorieBurn ? '#ff6b6b' : '#ddd'
              }}
              type="number"
              name="calorieBurn"
              placeholder="Calorie Burn"
              value={exerciseData.calorieBurn}
              onChange={handleChange}
            />
            {errors.calorieBurn && (
              <div style={styles.errorMessage}>
                <XCircle size={16} color="#ff6b6b" style={styles.errorIcon} />
                {errors.calorieBurn}
              </div>
            )}
          </div>

          {/* File Input */}
          <div style={styles.fileInputWrapper}>
            <label htmlFor="fileInput" style={styles.fileLabel}>
              Exercise Image
            </label>
            <input
              style={{
                ...styles.fileInput,
                borderColor: errors.image ? '#ff6b6b' : '#ddd'
              }}
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
            />
            {errors.image && (
              <div style={styles.errorMessage}>
                <XCircle size={16} color="#ff6b6b" style={styles.errorIcon} />
                {errors.image}
              </div>
            )}
            {imageFile && (
              <div style={styles.fileSuccessMessage}>
                <CheckCircle2 size={16} color="#48bb78" style={styles.successIcon} />
                {imageFile.name}
              </div>
            )}
          </div>

          {/* Submission Status Message */}
          {submissionStatus && (
            <div style={
              submissionStatus.type === 'success' 
                ? styles.successMessage 
                : styles.errorMessage
            }>
              {submissionStatus.type === 'success' ? (
                <CheckCircle2 size={20} color="#48bb78" style={styles.successIcon} />
              ) : (
                <AlertTriangle size={20} color="#ff6b6b" style={styles.errorIcon} />
              )}
              {submissionStatus.message}
            </div>
          )}

          <button
            style={styles.button}
            type="submit"
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Add Exercise
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f9',
    padding: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    maxWidth: '500px',
    width: '100%',
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
  inputGroup: {
    width: '100%',
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#f9f9f9',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
  },
  fileInputWrapper: {
    width: '100%',
    marginBottom: '1rem',
  },
  fileLabel: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#333',
  },
  fileInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#f9f9f9',
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
    transition: 'transform 0.3s ease',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  errorMessage: {
    color: '#ff6b6b',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  errorIcon: {
    marginRight: '0.5rem',
  },
  successMessage: {
    color: '#48bb78',
    backgroundColor: '#f0fff4',
    border: '1px solid #48bb78',
    padding: '0.75rem',
    borderRadius: '8px',
    fontSize: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
  successIcon: {
    marginRight: '0.5rem',
  },
  fileSuccessMessage: {
    color: '#48bb78',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    display: 'flex',
    alignItems: 'center',
  },
};

export default AddExercise;
