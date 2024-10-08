import React from "react";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";

function SignInForm() {
  const [userCred, setUserCred] = useState({
    email: "",
    password: ""
  });

  // const handleChange = evt => {
  //   const value = evt.target.value;
  //   setState({
  //     ...state,
  //     [evt.target.name]: value
  //   });
  // };

  const handleChange=(e)=>{
    setUserCred({...userCred,[e.target.name]:e.target.value})
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userCred;
    alert(`You are logging in with email: ${email} and password: ${password}`);

    // Reset state after submission
    for (const key in userCred) {
      setUserCred({
        ...userCred,
        [key]: ""
      });
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
          type="email"
          placeholder="Email"
          name="email"
          value={userCred.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userCred.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
