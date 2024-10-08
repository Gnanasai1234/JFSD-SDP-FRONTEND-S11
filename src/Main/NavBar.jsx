import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './AboutUs';
import AdminLogin from './AdminLogin';
import Contact from './ContactUs';
import Notfound from '../Usercomponents/NotFound';
import React, { useState } from 'react';
import logo from '../images/logo.jpg'; 
import UserLogin from './UserLogin'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-component">
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap");
          
          * {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            padding: 0;
            margin: 0;
            font-family: "Poppins", sans-serif;
          }

          .navbar-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 80px; /* Set a fixed height */
            padding: 10px 5%;
            display: flex;
        
            justify-content: space-between;
            align-items: center;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, 
                        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px, 
                        rgba(0, 0, 0, 0.5) 0px 4px 10px;
            z-index: 1000; /* Ensure the navbar stays on top */
            background-color: #fff;
          }

          .navbar-logo img {
            height: 60px; /* Adjust logo height */
            width: auto; /* Maintain aspect ratio */
            margin-right: 10px;
          }

          .navbar-logo h1 {
            font-size: 1.4rem;
            background: linear-gradient(to right, #b927fc 0%, #2c64fc 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .navbar-menu {
            list-style: none;
            display: flex;
            align-items: center;
            padding: 0;
            margin: 0;
          }

          .navbar-menu-item {
            margin-left: 1.5rem;
            list-style: none; /* No bullets on list */
          }

          .navbar-menu-item a {
            text-decoration: none;
            color: #000;
            font-size: 1rem;
            font-weight: 500;
            padding: 8px 12px;
            border-radius: 5px;
          }

          .navbar-menu-item a:hover {
            background-color: #f5f5f5;
            color: #000;
          }

          .navbar-dropdown-content {
            display: none;
            position: absolute;
            background-color: #fff;
            min-width: 160px;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 16px;
            z-index: 1;
            border-radius: 5px;
          }

          .navbar-dropdown-content a {
            color: #000;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            transition: background-color 0.3s ease;
          }

          .navbar-dropdown-content a:hover {
            background-color: #ddd;
          }

          .navbar-dropdown:hover .navbar-dropdown-content {
            display: block;
          }

          .navbar-hamburger {
            display: none;
            cursor: pointer;
          }

          .navbar-hamburger .line {
            width: 25px;
            height: 2px;
            background-color: #1f1f1f;
            margin: 5px 0;
            transition: all 0.3s ease-in-out;
          }

          .navbar-links {
            display: flex;
          }

          .navbar-links.open {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            z-index: 10;
            justify-content: center;
            transition: transform 0.3s ease-in-out;
          }

          .navbar-links li {
            margin: 20px 0;
            list-style: none;
          }

          @media (max-width: 790px) {
            .navbar-hamburger {
              display: block;
            }

            .navbar-menu {
              display: none;
            }

            .navbar-links.open {
              display: flex;
            }

            .navbar-links {
              display: none;
            }
          }
        `}
      </style>
      <BrowserRouter>
        <nav className="navbar-container">
          <div className="navbar-logo">
            <Link to="/">  
              <img src={logo} alt="logo" /> 
            </Link> 
          </div>
          <div className="navbar-hamburger" onClick={toggleMenu}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
          <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
            <li className="navbar-menu-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="navbar-menu-item navbar-dropdown">
              <Link to="#">Login</Link>
              <div className="navbar-dropdown-content">
                <Link to="/userlogin">User Login/Register</Link>
                <Link to="/adminlogin">Admin Login</Link>
              </div>
            </li>
            <li className="navbar-menu-item">
              <Link to="/about">About Us</Link>
            </li>
            <li className="navbar-menu-item">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Navbar;
