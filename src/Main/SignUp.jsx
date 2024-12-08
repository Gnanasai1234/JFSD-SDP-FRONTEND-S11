import axios from "axios";
import React, { useState } from "react";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

function SignUpForm() {
  const [state, setState] = useState({
    fullname: "",
    username: "",
    gender: "",
    age: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    type: "",
    message: "",
    hidden: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });

    if (e.target.name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    if (password.length >= 12) strength += 1; // Additional rule for very strong passwords
    return strength;
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const response = await axios.post("http://localhost:8080/user/register", state);

    if (response.status === 200) {
      setMessage({
        type: "success",
        message: "Registered Successfully",
        hidden: false,
      });

      setTimeout(() => {
        setMessage((prev) => ({
          ...prev,
          hidden: true,
        }));
      }, 7000);

      setState({
        fullname: "",
        username: "",
        gender: "",
        age: "",
        email: "",
        password: "",
      });
    } else {
      setMessage({
        type: "failed",
        message: "Something went wrong, try again.",
        hidden: false,
      });

      setTimeout(() => {
        setMessage((prev) => ({
          ...prev,
          hidden: true,
        }));
      }, 3000);
    }
  };

  return (
    <div>
      <div className="form-container sign-up-container">
        <form onSubmit={handleOnSubmit}>
          <h1>Create Account</h1>
          {message.message && (
            <div
              className={`message ${message.type} ${message.hidden ? "hidden" : ""}`}
            >
              {message.message}
            </div>
          )}
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

          <input
            type="text"
            name="fullname"
            value={state.fullname}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <div className="gender-box">
            <select
              id="gender"
              name="gender"
              onChange={handleChange}
              required
              value={state.gender}
            >
              <option value="">--Select Gender--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <input
            type="number"
            name="age"
            value={state.age}
            onChange={handleChange}
            placeholder="Enter Age"
          />

          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
          />

          {/* Enhanced Password Strength Meter */}
          {state.password && (
            <>
              <div
                className={`password-strength-meter ${
                  passwordStrength > 0 ? "visible" : ""
                }`}
              >
                <div
                  className="strength-bar"
                  style={{
                    width: `${(passwordStrength / 5) * 100}%`,
                    backgroundColor:
                      passwordStrength === 5
                        ? "darkgreen"
                        : passwordStrength >= 3
                        ? "orange"
                        : "crimson",
                  }}
                ></div>
              </div>
              <p>
                {passwordStrength === 0
                  ? "Weak"
                  : passwordStrength === 1
                  ? "Weak"
                  : passwordStrength === 2
                  ? "Moderate"
                  : passwordStrength === 3
                  ? "Strong"
                  : "Very Strong"}
              </p>
            </>
          )}

          <button type="submit">Sign Up</button>
        </form>

        <style>{`
          .gender-box {
            width: 100%;
            max-width: 350px;
          }

          .message {
            margin: 0 0 10px 0;
            padding: 10px;
            border-radius: 5px;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            transition: opacity 0.3s ease;
          }

          .message.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
          }

          .message.failed {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
          }

          .message.hidden {
            opacity: 0;
            pointer-events: none;
          }

          .gender-box select {
            width: 100%;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #ddd;
            background-color: #f8f8f8;
            font-size: 16px;
            color: #333;
            transition: all 0.3s ease;
            box-sizing: border-box;
          }

          .gender-box select:focus {
            border-color: #007bff;
            background-color: white;
            outline: none;
          }

   /* Container for the password strength meter */
.password-strength-meter {
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 10px;
    position: relative;
    transition: opacity 0.3s ease;
    opacity: 0; /* Default opacity for hidden state */
}

/* Make the meter visible */
.password-strength-meter.visible {
    opacity: 1; /* Fully visible */
}

/* Strength bar styling */
.strength-bar {
    height: 100%;
    width: 0%; /* Default width */
    background-color: crimson; /* Default color (weak) */
    border-radius: 5px;
    transition: width 0.5s ease-in-out, background-color 0.3s ease;
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
    .password-strength-meter {
        height: 8px; /* Adjust height for smaller screens */
    }
}

@media (max-width: 480px) {
    .password-strength-meter {
        height: 6px; /* Further adjust height for very small screens */
    }
}

/* Accessibility: Add contrast and focus indication */
.password-strength-meter:focus-within {
    box-shadow: 0 0 3px 2px rgba(0, 0, 255, 0.5); /* Outline when focused */
}

/* Dynamic bar colors based on strength level */
.strength-bar.weak {
    background-color: crimson; /* Weak */
}

.strength-bar.medium {
    background-color: orange; /* Medium */
}

.strength-bar.strong {
    background-color: green; /* Strong */
}

/* Add hover effect for better feedback */
.password-strength-meter:hover {
    background-color: #d0d0d0; /* Slightly darker background on hover */
}

/* Smooth transitions for width changes */
.password-strength-meter .strength-bar {
    transition: width 0.5s ease-in-out, background-color 0.3s ease;
}

/* Ensure smooth visibility change */
.password-strength-meter.visible {
    transition: opacity 0.3s ease-in-out;
}


          select,
          input {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            border-radius: 4px;
            border: 1px solid #ddd;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </div>
  );
}

export default SignUpForm;
