import React, { useState } from 'react';

export default function Login() {
  const [userCreds, setUserCred] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState({
    type: "invisible-msg",
    text: ""
  });

  const handleInput = (e) => {
    setUserCred({ ...userCreds, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div style={styles.container}>
      <div style={styles.rectangle2}>
        <h1 style={styles.title}>Admin Login</h1>
        <form method="post" onSubmit={submitForm} style={styles.form}>
          <div style={styles.inputWrapper}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={handleInput}
              style={styles.input}
            />
          </div>
          <div style={styles.inputWrapper}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInput}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
          <p className={message.type} style={styles.message}>{message.text}</p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    
  },
  rectangle2: {
    position: 'relative',
    width: '664px',
    height: '495px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '30px',
    padding: '30px',
  },
  title: {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '22px',
    color: '#000000',
    fontWeight: '400',
  },
  form: {
    position: 'relative',
    marginTop: '80px',
  },
  inputWrapper: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '22px',
    color: '#000000',
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '541px',
    height: '60px',
    padding: '15px',
    borderRadius: '30px',
    border: '1px solid #ddd',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontSize: '16px',
    outline: 'none',
    marginBottom: '10px',
    color: '#000000',
  },
  button: {
    width: '143px',
    height: '62px',
    backgroundColor: '#000000',
    border: 'none',
    borderRadius: '30px',
    color: '#FFFFFF',
    fontSize: '22px',
    cursor: 'pointer',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '420px',
  },
  message: {
    fontSize: '14px',
    color: '#FF0000',
    marginTop: '10px',
  },
};
