import React from 'react';
import { Link } from 'react-router-dom';
const AboutUs = () => {
  const styles = {
    container: {
      backgroundColor: '#f4f9f4', 
      padding: '30px',
      borderRadius: '15px',
      margin: '20px auto', // Center the container
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '800px',
      marginTop: '130px', // Add top margin to avoid overlap with navbar
    },
  
    subheader: {
      fontSize: '24px',
      color: '#48bb78', // Lighter green for headings
      marginBottom: '15px',
      borderBottom: '2px solid #48bb78',
      paddingBottom: '5px',
    },
    text: {
      fontSize: '18px',
      lineHeight: '1.6',
      color: '#333333', // Dark gray text
      marginBottom: '20px',
    },
    list: {
      paddingLeft: '20px',
      marginBottom: '20px',
    },
    listItem: {
      marginBottom: '10px',
      listStyleType: 'none',
      display: 'flex',
      alignItems: 'center',
    },
    checkmark: {
      color: '#2f855a', 
      marginRight: '10px',
    },
    button: {
      
      backgroundColor: '#2f855a', 
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#276749', 
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>About NutriTrack</h1>

      <p style={styles.text}>
        NutriTrack is a comprehensive nutrition app designed to help you
        effortlessly track your meals, plan your diets, and monitor your
        nutritional intake—all from the convenience of your smartphone.
      </p>

      <h2 style={styles.subheader}>Key Features</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <span style={styles.checkmark}>✔️</span>Track Meals: Log your daily food intake and monitor your nutrition.
        </li>
        <li style={styles.listItem}>
          <span style={styles.checkmark}>✔️</span>Custom Meal Planning: Tailored meal plans to suit your dietary needs.
        </li>
        <li style={styles.listItem}>
          <span style={styles.checkmark}>✔️</span>Accessible Anywhere: Enjoy the flexibility of tracking your meals anytime, anywhere.
        </li>
      </ul>

      <h2 style={styles.subheader}>Benefits</h2>
      <p style={styles.text}>
        NutriTrack empowers users to make informed food choices, supporting
        their journey toward better health and well-being. With our
        easy-to-use interface and personalized features, achieving your
        nutrition goals has never been easier!
      </p>

      <h2 style={styles.subheader}>User-Centric Design</h2>
      <p style={styles.text}>
        Our user-friendly interface ensures that everyone, regardless of their
        tech skills, can navigate the app with ease and confidence.
      </p>

      <h2 style={styles.subheader}>Future Goals</h2>
      <p style={styles.text}>
        We are constantly innovating and expanding NutriTrack to include more
        features that cater to your nutritional needs, ensuring that you always
        have the best tools at your disposal.
      </p>

      <h2 style={styles.subheader}>Join Us</h2>
      <p style={styles.text}>
        Join us on this journey towards healthier living with NutriTrack, where
        your nutrition goals are just a tap away!
      </p>
      
      <button style={styles.button}  >
    <Link to="/userlogin">Get Started</Link>  
      </button>
    </div>
  );
};

export default AboutUs;
