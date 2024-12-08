import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserShimmerCard from './UserShimmerCard';
import UserExerciseCard from './UserExerciseCard';

export default function GetExercises() {
  const [exercise, setExercise] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const getExercise = async () => {
    try {
      const response = await axios.get('http://localhost:8080/exercise/viewallexercises');
      setExercise(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Exercise data:', error);
      setError('Error fetching Exercise data');
      setLoading(false);
    }
  };

  useEffect(() => {
    getExercise();
  }, []);

  const filteredExercise = exercise.filter((ex) =>
    ex.exerciseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>View All Exercises</h1>
      <p style={styles.description}>
        Explore a comprehensive list of all available exercises. Manage, edit, or add new exercise routines effortlessly.
      </p>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            ...styles.searchBar,
            ...(isFocused ? styles.searchBarFocus : {}),
          }}
        />
      </div>
      {loading ? (
        <div style={styles.shimmerContainer}>
          {Array.from({ length: 10 }).map((_, index) => (
            <UserShimmerCard key={index} />
          ))}
        </div>
      ) : error ? (
        <p style={styles.errorText}>{error}</p>
      ) : (
        <div style={styles.exerciseList}>
          {filteredExercise.length > 0 ? (
            filteredExercise.map((exerciseItem, index) => (
              <div key={index} style={styles.exerciseCard}>
                <UserExerciseCard exercise={exerciseItem} />
              </div>
            ))
          ) : (
            <p style={styles.noResultsText}>No exercises match your search criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    marginTop: '20px',
    marginLeft: '40px',
    marginRight: '40px',
    boxSizing: 'border-box',
  },
  heading: {
    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
    fontWeight: 'bold',
    color: '#1565c0',
    marginBottom: '20px',
    textTransform: 'uppercase',
    borderBottom: '3px solid #1565c0',
    paddingBottom: '10px',
  },
  description: {
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    color: '#37474f',
    marginBottom: '30px',
    lineHeight: '1.6',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '20px',
  },
  searchBar: {
    width: '100%',
    maxWidth: '600px',
    padding: '12px 16px',
    borderRadius: '24px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  searchBarFocus: {
    border: '1px solid #e67e22',
    boxShadow: '0 0 8px rgba(230, 126, 34, 0.7)',
  },
  exerciseList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'start',
    padding: '10px',
  },
  exerciseCard: {
    animation: 'fadeIn 0.5s ease',
    transition: 'all 0.3s ease-in-out',
  },
  shimmerContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
    padding: '10px',
  },
  errorText: {
    color: 'red',
    fontSize: '1.2rem',
    textAlign: 'center',
  },
  noResultsText: {
    gridColumn: '1 / -1',
    fontSize: '1.2rem',
    color: '#555',
    textAlign: 'center',
  },
};

/* Add CSS for keyframes */
const fadeInKeyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(fadeInKeyframes, styleSheet.cssRules.length);
