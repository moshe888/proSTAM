import React from 'react';
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const imagePath = new URLSearchParams(location.search).get('imagePath');

  return (
    <div>
      <h1>Dashboard</h1>
      <img src={imagePath} alt="Scanned Image" />
      {/* Add your AI results and other dashboard content here */}
    </div>
  );
}

export default Dashboard;
