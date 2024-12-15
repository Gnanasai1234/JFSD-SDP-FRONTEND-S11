import React, { useState } from 'react';
import axios from 'axios';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

const AddFood = () => {
  const [foodData, setFoodData] = useState({
    name: '',
    calories: '',
    fat: '',
    protein: '',
    carbohydrates: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
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
    Object.entries(foodData).forEach(([key, value]) => {
      if (!value.toString().trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    // Image validation
    if (!imageFile) {
      newErrors.image = 'Please upload an image';
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
    const food = {
      name: foodData.name,
      calories: foodData.calories,
      fat: foodData.fat,
      protein: foodData.protein,
      carbohydrates: foodData.carbohydrates,
    };
    formData.append('food', new Blob([JSON.stringify(food)], { type: 'application/json' }));

    if (imageFile) formData.append('image', imageFile);

    try {
      const response = await axios.post('https://backendapp-production-8749.up.railway.app/food/addfood', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Reset form
      setFoodData({
        name: '',
        calories: '',
        fat: '',
        protein: '',
        carbohydrates: '',
      });
      setImageFile(null);
      setErrors({});
      
      // Set success status
      setSubmissionStatus({
        type: 'success',
        message: response.data.message || 'Food item added successfully!'
      });
    } catch (error) {
      console.error('There was an error adding the food item!', error);
      setSubmissionStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to add food item. Please try again.'
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.heading}>Add Food</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Input fields with error handling */}
          {['name', 'calories', 'fat', 'protein', 'carbohydrates'].map((field) => (
            <div key={field} style={styles.inputGroup}>
              <input
                style={{
                  ...styles.input,
                  borderColor: errors[field] ? '#ff6b6b' : '#ddd'
                }}
                type={field === 'name' ? 'text' : 'number'}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={foodData[field]}
                onChange={handleChange}
              />
              {errors[field] && (
                <div style={styles.errorMessage}>
                  <XCircle size={16} color="#ff6b6b" style={styles.errorIcon} />
                  {errors[field]}
                </div>
              )}
            </div>
          ))}

          {/* File input with error handling */}
          <div style={styles.fileInputWrapper}>
            <label htmlFor="fileInput" style={styles.fileLabel}>
              Upload Image
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

          {/* Submission status message */}
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
            Add Food
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
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    width: '100%',
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

export default AddFood;
