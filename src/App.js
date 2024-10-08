import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Main/NavBar';
import UserNavbar from './Usercomponents/UserNavbar';

function App() {
  // const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("nutrify-user")));

  // useEffect(() => {
  //   const user = localStorage.getItem("nutrify-user");
  //   if (user !== null) {
  //     setLoggedUser(JSON.parse(user));
  //   }
  // }, []); 

  return (
    <div className="App">

    <Navbar/>
    {/* <UserNavbar/> */}
    
    
    </div>
  );
}

export default App;
