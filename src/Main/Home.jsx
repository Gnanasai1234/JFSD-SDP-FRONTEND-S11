import React from "react";
import TrackImage from '../images/trackimage.jpg';
import customplan from '../images/customplan.jpg';
import healthreceipies from '../images/healthreceipies.jpg';
import progress from '../images/progress.jpg';
import anywhere from '../images/anywhere.jpg';
import logo from '../images/logo.jpg';

const HomePage = () => {
  return (
    <div style={{ ...styles.container, marginTop:'130px' ,width:'1400px',marginLeft:'20px',height:'60vh' }}> 
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>NutriTrack</div>
      </div>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroText}>Eat Smart, Live Well</h1>
          <p style={styles.heroSubText}>Your personal guide to balanced nutrition and healthy living.</p>
        </div>
      </div>

      {/* Features Overview */}
      <div style={styles.featuresSection}>
        <h2>App Features</h2>
        <div style={styles.featuresGrid}>

          <div style={styles.featureCard}>
            <img src={TrackImage} alt="Track Meals" style={styles.featureIcon} />
            <h3>Track Meals</h3>
            <p>Log your daily food intake and monitor your nutrition.</p>
          </div>

          <div style={styles.featureCard}>
            <img src={healthreceipies} alt="Healthy Recipes" style={styles.featureIcon} />
            <h3>Healthy Recipes</h3>
            <p>Explore balanced and delicious meals curated by experts.</p>
          </div>
          <div style={styles.featureCard}>
            <img src={progress} alt="Progress Reports" style={styles.featureIcon} />
            <h3>Progress Reports</h3>
            <p>Track your fitness journey and analyze your progress.</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div style={styles.benefitsSection}>
        <h2>Why Choose NutriTrack?</h2>

        <div style={styles.benefitsGrid}>
          <div style={styles.benefitItem1}>
          <div style={styles.benefitItem}>
            <img src={customplan} alt="Benefit" style={styles.benefitIcon} />
            <p>Custom meal planning tailored to your dietary needs.</p>
          </div>
          </div>
          <div style={styles.benefitItem}>
            <img src={anywhere} alt="Benefit" style={styles.benefitIcon} />
            <p>Accessible from anywhere, anytime.</p>
          </div>

        </div>
      </div>

      {/* Testimonials Section */}
      <div style={styles.testimonialsSection}>
        <h2>What Our Users Say</h2>
        <div style={styles.testimonial}>
          <p>"NutriTrack has transformed the way I manage my diet. Highly recommended!"</p>
          <span>- Sarah</span>
        </div>
        <div style={styles.testimonial}>
          <p>"With NutriTrack, I've achieved my fitness goals much faster."</p>
          <span>- Michael</span>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div>© 2024 NutriTrack</div>
        <nav style={styles.footerNav}>
          <a href="#" style={styles.footerLink}>Privacy Policy</a>
          <a href="#" style={styles.footerLink}>Terms of Service</a>
        </nav>
      </div>
    </div>
  );
};

const styles = {
  
  container: {
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    margin: "0",
    padding: "0",
  },
  header: {
    height:"auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#28a745",
    color: "#fff",
  },
  logo: {
    height:"auto",
    fontSize: "24px",
    fontWeight: "bold",
  },
  heroSection: {
    position: "relative",
    width:"100%",
    height: "100vh", // Adjust the height as needed
    backgroundImage: `url(${logo})`, // Path to the logo image
    backgroundSize: "cover", // Ensures the image fits within the section
    backgroundRepeat: "no-repeat", // Prevents repeating the image
    backgroundPosition: "center center", // Centers the image in the hero section
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    
  },
  heroOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better readability of text
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
    color: "#fff",
  },
  heroText: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  heroSubText: {
    fontSize: "18px",
  },
  featuresSection: {
    padding: "60px 20px",
    backgroundColor: "#f9f9f9",
  },
  featuresGrid: {
    display: "flex",
    justifyContent: "space-around",
    gap: "20px",
  },
  featureCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "30%",
  },
  featureIcon: {
    marginBottom: "10px",
    height: "200px", 
    width: "100%",
  },
  benefitsSection: {
    padding: "60px 20px",
  },
  benefitsGrid: {
    display: "flex",
    justifyContent: "space-around",
  },
  benefitItem: {
    textAlign: "center",
  },
  benefitIcon: {
    marginBottom: "10px",
    height: "300px",
    width: "100%",
  },
  testimonialsSection: {
    padding: "60px 20px",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
  },
  testimonial: {
    fontStyle: "italic",
    marginBottom: "20px",
  },
  footer: {
    padding: "20px",
    backgroundColor: "#28a745",
    color: "#fff",
    textAlign: "center",
  },
  footerNav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  footerLink: {
    color: "#fff",
    textDecoration: "none",
  },
  benefitItem1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px", // Adjusts spacing between multiple cards
  },
  benefitItem: {
    backgroundColor: "white",                     // White background for the card
    borderRadius: "10px",                         // Rounded corners
    padding: "20px",                              // Adds spacing inside the card
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    width: "300px",                               // Width of the card
    textAlign: "center",                          // Centers the content
  },
  benefitIcon: {
    borderRadius: "10px",                         // Keeps rounded corners on the image
    marginTop: "20px",
    marginBottom: "10px",
    height: "200px",                              // Adjusts height for the image
    width: "100%",                                // Ensures the image fits within the card width
    objectFit: "cover",                           // Ensures the image scales properly
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow to the image
  },
};

export default HomePage;
