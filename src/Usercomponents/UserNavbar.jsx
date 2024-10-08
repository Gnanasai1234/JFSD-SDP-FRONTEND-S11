import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../images/logo.jpg'; // Replace this with your actual logo import
import Dashboard from './Dashboard';
import Updatediet from './Updatediet';
import Articles from './Articles';
import Profile from './Profile';

function UserNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-component">
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
          
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: "Poppins", sans-serif;
          }

          .navbar-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 80px;
            padding: 10px 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, 
                        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px, 
                        rgba(0, 0, 0, 0.5) 0px 4px 10px;
            background-color: #fff;
            z-index: 1000;
          }

          .navbar-logo img {
            height: 60px;
            margin-right: 10px;
          }

          .navbar-logo h1 {
            font-size: 1.4rem;
            background: linear-gradient(to right, #b927fc 0%, #2c64fc 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .navbar-links {
            display: flex;
          }

          .navbar-menu-item {
            margin-left: 1.5rem;
            list-style: none;
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
          }
        `}
      </style>

      <BrowserRouter>
        <nav className="navbar-container">
          <div className="navbar-logo">
            <Link to="/dashboard">
              <img src={logo} alt="logo" /> 
            </Link>
          </div>

          <div className="navbar-hamburger" onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
            <li className="navbar-menu-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="navbar-menu-item">
              <Link to="/updatediet">Update Diet</Link>
            </li>
            <li className="navbar-menu-item">
              <Link to="/articles">Articles</Link>
            </li>
            <li className="navbar-menu-item">
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/updatediet" element={<Updatediet />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default UserNavbar;
