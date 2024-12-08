import React, { useState } from "react";
import axios from "axios";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router";

function SignInForm({onUserLoggedIn}) {
  const [userCred, setUserCred] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserCred({ ...userCred, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/login", userCred);
      
      if (response.status === 200) {
        localStorage.setItem("user", userCred.username);
        
        onUserLoggedIn();
        setUserCred({ username: "", password: "" });
        setError(null); 
        navigate("/user/dashboard") 
      } else {
        setError("Login failed. Please try again.");
        setUserCred({ username: "", password: "" });
      }
    } catch (err) {
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FaFacebookF />
          </a>
          <a href="#" className="social">
            <FaGooglePlusG />
          </a>
          <a href="#" className="social">
            <FaLinkedinIn />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={userCred.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userCred.password}
          onChange={handleChange}
        />
        {error && <p className="error-message">{error}</p>}
        <br/>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
