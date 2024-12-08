import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import logo from '../images/logo.jpg';
import AdminHome from './AdminHome';
import AddFood from './AddFood';
import ViewAllFoods from './ViewAllFoods';
import ViewAllUsers from './ViewAllUsers';
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ViewAllArticles from './ViewAllArticles';
import EditFood from './EditFood';
import { FaPizzaSlice } from 'react-icons/fa';
import AddExercise from './AddExercise';
import { Dumbbell, ListChecks } from 'lucide-react';
import ViewAllExercises from './ViewAllExercises';
import EditExercise from './EditExercise';
import AddArticle from './AddArticle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import ArticleCard from './ArticleCard';
import ViewUserDiet from './ViewUserDiet';

function AdminNavbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem('userlogged');
    localStorage.removeItem("adminLogged");
    navigate("/");
    window.location.reload();
  };

  const menuItems = [
    { text: 'View Foods', path: '/admin/viewfood', icon: <FaPizzaSlice /> },
    { text: 'Add Food', path: '/admin/addfood', icon: <FastfoodIcon /> },
    {text:'Add Exercise' , path:'/admin/addexercise' ,   icon: <Dumbbell />},
    {text:'View Exercises' , path:'/admin/viewexercise' , icon:<ListChecks/>},
    { text: 'Add Articles', path: '/admin/addarticle', icon: <AddCircleIcon /> },
    { text: 'View Articles', path: '/admin/viewallarticles', icon: <ViewListIcon /> },
    { text: 'View All Users', path: '/admin/viewallusers', icon: <GroupIcon /> },
  
];

  const drawerList = (
    <Box
      sx={{
        width: 250,
        background: '#F4F6FF',
        height: '100%',
        color: 'black'
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Link to="/admin/viewfood/">
          <img src={logo} alt="Logo" style={{ width: '80%', height: 'auto' }} />
        </Link>
      </Box>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon sx={{ color: 'grey' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: 'grey' }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  
  return (
    <div>
      {!isDrawerOpen && (
        <Button onClick={toggleDrawer(true)} sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 1201,
          color: 'black',
          backgroundColor: 'lightgrey',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ width: '25px', height: '3px', background: 'black', margin: '4px 0' }} />
            <span style={{ width: '25px', height: '3px', background: 'black', margin: '4px 0' }} />
            <span style={{ width: '25px', height: '3px', background: 'black', margin: '4px 0' }} />
          </div>
        </Button>
      )}

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList}
      </Drawer>

      {/* Main Content */}
      <Box sx={{
        marginLeft: isDrawerOpen ? '250px' : '0',
        transition: 'margin-left 0.3s ease',
        p: 3
      }}>
        <Routes>
        <Route path="/" element={<ViewAllFoods />} />
          <Route path="/admin/" element={<ViewAllFoods />} />
          <Route path="/admin/adminhome" element={<AdminHome />} />
          <Route path="/admin/addfood" element={<AddFood />} />
          <Route path="/admin/viewfood" element={<ViewAllFoods />} />
          <Route path="/admin/viewallusers" element={<ViewAllUsers />} />
          <Route path="/admin/viewallarticles" element={<ViewAllArticles />} />
          <Route path="/admin/editfood" element={<EditFood/>} />
          <Route path="/admin/addarticle" element={<AddArticle/>}/>
          <Route path="/admin/viewarticle" element={<ArticleCard/>}/>
          <Route path="/admin/addexercise" element={<AddExercise/>}/>
          <Route path="/admin/viewexercise" element={<ViewAllExercises/>}/>
          <Route path="/admin/editexercise" element={<EditExercise/>}/>
          <Route path="/admin/viewuserdiet" element={<ViewUserDiet/>}/>


        </Routes>
      </Box>
    </div>
  );
}

export default AdminNavbar;
