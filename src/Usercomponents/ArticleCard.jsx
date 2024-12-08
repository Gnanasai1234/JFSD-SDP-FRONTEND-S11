import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ArticleCard = () => {
  const location = useLocation();
  const { article } = location.state || {};

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const [articleData, setArticleData] = useState({
    relatedto: '',
    title: '',
    description: '',
  });

  const setArticle = () => {
    if (article) {
      setArticleData({
        relatedto: article.relatedto || '',
        title: article.title || '',
        description: article.description || '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData({
      ...articleData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!articleData.relatedto || !articleData.title || !articleData.description) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields.',
        severity: 'error',
      });
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/articles/updatearticle',
        articleData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      setSnackbar({
        open: true,
        message: response.data.message || 'Article updated successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error updating article:', error);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message || 'Failed to update article. Please try again.',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    setArticle();
  }, [location.state]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>View Article</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {[
          { label: 'Related To', name: 'relatedto', value: articleData.relatedto },
          { label: 'Title', name: 'title', value: articleData.title },
          { label: 'Description', name: 'description', value: articleData.description, type: 'textarea' },
        ].map((field, index) => (
          <div key={index} style={styles.inputGroup}>
            <label htmlFor={field.name} style={styles.label}>
              {field.label}:
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                style={styles.textarea}
                required
              />
            ) : (
              <input
                id={field.name}
                type="text"
                name={field.name}
                value={field.value}
                onChange={handleChange}
                style={styles.input}
                required
              />
            )}
          </div>
        ))}
        
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    height: '100px',
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default ArticleCard;
