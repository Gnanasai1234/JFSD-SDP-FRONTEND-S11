import React from "react";
import TrackImage from '../images/trackimage.jpg';
import customplan from '../images/customplan.jpg';
import healthreceipies from '../images/healthreceipies.jpg';
import progress from '../images/progress.jpg';
import anywhere from '../images/anywhere.jpg';
import logo from '../images/logo.jpg';
import homeimage from '../images/homepage.jpg'

const HomePage = () => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>NutriTrack</div>
      </div>

      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroText}>Eat Smart, Live Well</h1>
          <p style={styles.heroSubText}>Your personal guide to balanced nutrition and healthy living.</p>
        </div>
      </div>

      {/* Features Overview */}
      <div style={styles.featuresSection}>
        <h2 style={styles.featuresHeading}>App Features</h2>
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
        <h2 style={styles.featuresHeading}>Why Choose NutriTrack?</h2>
        <div style={styles.benefitsGrid}>
          <div style={styles.benefitItem}>
            <img src={customplan} alt="Custom Meal Plan" style={styles.benefitIcon} />
            <p>Custom meal planning tailored to your dietary needs.</p>
          </div>
          <div style={styles.benefitItem}>
            <img src={anywhere} alt="Access Anywhere" style={styles.benefitIcon} />
            <p>Accessible from anywhere, anytime.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={styles.testimonialsSection}>
        <h2 style={styles.featuresHeading}>What Our Users Say</h2>
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
    width: '100%',
    backgroundColor: "#f4f4f9", // Light background for the whole page
    boxSizing: 'border-box', // Ensures padding is included in width/height calculations
  },
  header: {
    height: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "#28a745",
    color: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow below the header
  },
  logo: {
    fontSize: "30px",
    fontWeight: "bold",
  },
  heroSection: {
    position: "relative",
    width: "100%",
    height: "100vh", 
    backgroundImage: `url(${homeimage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heroOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "50px",
    borderRadius: "10px",
    textAlign: "center",
    color: "#fff",
  },
  heroText: {
    fontSize: "56px",
    fontWeight: "bold",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  },
  heroSubText: {
    fontSize: "20px",
    fontWeight: "300",
  },
  featuresSection: {
    padding: "60px 20px",
    backgroundColor: "#f9f9f9",
  },
  featuresHeading: {
    fontSize: "36px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "40px",
  },
  featuresGrid: {
    display: "flex",
    justifyContent: "space-around",
    gap: "20px",
    flexWrap: "wrap",
  },
  featureCard: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "30%",
    minWidth: "280px", // Ensure cards are responsive
    marginBottom: "20px",
  },
  featureIcon: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  benefitsSection: {
    padding: "60px 20px",
    backgroundColor: "#fff",
  },
  benefitsGrid: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "30px",
  },
  benefitItem: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "45%",
    minWidth: "300px",
    marginBottom: "20px",
  },
  benefitIcon: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  testimonialsSection: {
    padding: "60px 20px",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
  },
  testimonial: {
    fontStyle: "italic",
    marginBottom: "20px",
    fontSize: "18px",
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
    gap: "30px",
    marginTop: "15px",
  },
  footerLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
};

export default HomePage;