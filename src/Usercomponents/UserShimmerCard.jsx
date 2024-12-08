import React from 'react';

const UserShimmerCard = () => {
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <div style={styles.shimmerImage}></div>
      </div>
      <div style={styles.content}>
        <div style={styles.shimmerText}></div>
        <div style={styles.shimmerText}></div>
        <div style={styles.shimmerText}></div>
        <div style={styles.shimmerText}></div>
        <div style={styles.shimmerText}></div>

        {/* <div style={styles.shimmerButton}></div> */}
        {/* <br/> */}
        <div style={styles.shimmerButton}></div>
      </div>
    </div>
  );
};

// Internal CSS
const styles = {
  card: {
    width: '220px',
    height: '520px',
    background: 'linear-gradient(145deg, #ffffff, #f3f3f3)',
    borderRadius: '16px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    margin: '12px',
    overflow: 'hidden',
  },
  imageContainer: {
    height: '220px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  shimmerImage: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite linear',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    textAlign: 'center',
    gap: '1rem',
  },
  shimmerText: {
    width: '80%',
    height: '16px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite linear',
  },
  shimmerButton: {
    width: '100%',
    height: '36px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
    animation: 'shimmer 1.5s infinite linear',
  },
};

// Keyframes for shimmer effect
const keyframes = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

// Injecting keyframes into the document
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default UserShimmerCard;
