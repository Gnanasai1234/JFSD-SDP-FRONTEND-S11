import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserNavbar from './Usercomponents/UserNavbar';
import Navbar from './Main/NavBar';
import AdminNavbar from './AdminComponent/AdminNavbar';


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    const userStatus = localStorage.getItem('userLogged') === 'true';
    const adminStatus = localStorage.getItem('adminLogged') === 'true';
    setUserLoggedIn(userStatus);
    setAdminLoggedIn(adminStatus);
  }, []);

  const onUserLoggedIn = () => {
    localStorage.setItem("userLogged", "true");
    setUserLoggedIn(true);
  };

  const onAdminLoggedIn = () => {
    localStorage.setItem("adminLogged", "true");
    setAdminLoggedIn(true);
  };

  return (
    <div className="App">
      <Router>
        {adminLoggedIn ? (
          
            <AdminNavbar />
            
          
        ) : userLoggedIn ? (
          <UserNavbar />
        ) : (
          <Navbar onUserLoggedIn={onUserLoggedIn} onAdminLoggedIn={onAdminLoggedIn} />
        )} 
      </Router>
    
      
    </div>
  );
}

export default App;
