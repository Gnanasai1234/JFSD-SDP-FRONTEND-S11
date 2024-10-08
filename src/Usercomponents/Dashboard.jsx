import React from 'react';
import Proteingraph from './graphs/Proteingraph';
import CaloriesGraph from './graphs/CaloriesGraph';
import CarbohydratesGraph from './graphs/CarbohydratesGraph';
import FatGraphs from './graphs/FatGraphs';
import PieChart from './graphs/PieChart';
import SugarsGraph from './graphs/SugarsGraphs';

export default function Dashboard() {
  const dashboardStyle = {
    marginTop: '45px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    opacity: 0.9, 
    transition: 'opacity 0.5s ease', 
  };

  const headerStyle = {
    textAlign: 'left',
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '20px',
    transition: 'color 0.3s ease',
  };

  const graphContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px', 
  };

  const graphStyle = {
    flex: '1 1 45%', 
    opacity: 0.95, 
    transition: 'opacity 0.5s ease, transform 0.5s ease', 
    transform: 'scale(1)', 
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.opacity = '1'; 
    e.currentTarget.style.transform = 'scale(1.05)'; 
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.opacity = '0.95'; 
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div style={dashboardStyle}>
      <h3 style={headerStyle}>Hello User, View User Analysis</h3>
      <div style={graphContainerStyle}>

      <div 
    style={graphStyle}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
      <PieChart/>
    </div>

      <div
          style={graphStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SugarsGraph />
        </div>

   

        <div
          style={graphStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Proteingraph />
        </div>
        <div
          style={graphStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarbohydratesGraph />
        </div>
        <div
          style={graphStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FatGraphs />
        </div>

      
        <div
          style={graphStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CaloriesGraph />
        </div>

      </div>
    </div>
  );
}
