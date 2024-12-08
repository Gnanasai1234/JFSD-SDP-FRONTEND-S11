import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    
    navigate('/userlogin');
    window.location.reload();

  }, [navigate]);

  return (
    <div>Logging out...</div>
  );
}
