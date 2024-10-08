import React from 'react';

export default function Notfound() {
  return (
    <div className="not-found" style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>Oops! The page you’re looking for doesn’t exist.</p>

      <style>
        {`
          .not-found {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            color: #333;
            font-family: 'Arial', sans-serif;
            text-align: center;
          }

          .not-found h1 {
            font-size: 100px;
            margin: 0;
            font-weight: 700;
            color: #e74c3c;
          }

          .not-found p {
            font-size: 18px;
            color: #555;
            margin-top: 10px;
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  heading: {
    fontSize: '100px',
    margin: '0',
    fontWeight: '700',
    color: '#e74c3c',
  },
  message: {
    fontSize: '18px',
    color: '#555',
    marginTop: '10px',
  },
};
