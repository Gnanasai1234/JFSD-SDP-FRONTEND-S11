import React from 'react';

// ContactForm Component
const ContactForm = () => {
  return (
    <div style={styles.container}>
      {/* Contact Information */}
      <div style={styles.contactInfo}>
        <h3>Contact Information</h3>
        <p><i className="fas fa-phone-alt"></i> +1 (555) 123-4567</p>
        <p><i className="fas fa-envelope"></i> contact@example.com</p>
        <p><i className="fas fa-map-marker-alt"></i> 1234 Street, City, Country</p>
      </div>

      {/* Contact Form */}
      <form style={styles.form}>
        <h2>Contact Us</h2>

        {/* Name Field */}
        <div style={styles.inputGroup}>
          <i className="fas fa-user" style={styles.icon}></i>
          <input type="text" name="name" placeholder="Your Name" style={styles.input} />
        </div>

        {/* Email Field */}
        <div style={styles.inputGroup}>
          <i className="fas fa-envelope" style={styles.icon}></i>
          <input type="email" name="email" placeholder="Your Email" style={styles.input} />
        </div>

        {/* Subject Field */}
        <div style={styles.inputGroup}>
          <i className="fas fa-tag" style={styles.icon}></i>
          <input type="text" name="subject" placeholder="Subject" style={styles.input} />
        </div>

        {/* Message Field */}
        <div style={styles.inputGroup}>
          <i className="fas fa-comments" style={styles.icon}></i>
          <textarea name="message" placeholder="Your Message" style={styles.textarea}></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>Send Message</button>
      </form>
    </div>
  );
};

// Internal CSS for styling
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px',
    flexWrap: 'wrap',
    gap: '40px',
    backgroundColor: '#f0f8f5', // light green background
    minHeight: '100vh',
    marginTop:'100px',
  },
  contactInfo: {
    flex: '1 1 300px',
    backgroundColor: '#e8f5e9', // pastel green
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  form: {
    flex: '1 1 400px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    position: 'relative',
    marginBottom: '20px',
  },
  icon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#888',
  },
  input: {
    width: '100%',
    padding: '12px 40px', // Adding space for the icon
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  textarea: {
    width: '100%',
    padding: '12px 40px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.1)',
    minHeight: '100px',
    resize: 'vertical',
    transition: 'all 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    background: 'linear-gradient(45deg, #81c784, #4caf50)', // Green gradient
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  buttonHover: {
    background: 'linear-gradient(45deg, #66bb6a, #388e3c)', // Darker green on hover
  },
  '@media (max-width: 768px)': {
    container: {
      flexDirection: 'column',
    },
    form: {
      width: '100%',
    },
    contactInfo: {
      width: '100%',
    },
  }
};

export default ContactForm;
