
import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import { Routes, Route } from "react-router-dom";
import StatusFilterPage from './pages/StatusFilterPage/statusFilterPage.jsx';
import UserFilterPage from './pages/UserFilterPage/userFilterPage.jsx';
import progress from './utils/progress';  // Import progress from the correct path

function App() {
  const url = "https://api.quicksell.co/v1/internal/frontend-assignment";
  const [responseData, updateData] = useState(null);
  const [isLoading, toggleLoading] = useState(true);
  const [fetchError, reportError] = useState(null);

  // Fetch responseData from API
  const retrieveData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch responseData');
      }
      const result = await response.json();
      updateData(result);
      toggleLoading(false);
    } catch (err) {
      reportError(err.message);
      toggleLoading(false);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  // Log the responseData for debugging
  console.log("Data fetched:", responseData);

  // Handle isLoading and fetchError states
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  if (fetchError) {
    return <div className="App">Error: {fetchError}</div>;
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<StatusFilterPage tickets={responseData.tickets} progress={progress} />}
        />
        <Route
          path='/user-filter'
          element={<UserFilterPage users={responseData.users} tickets={responseData.tickets} />}
        />
        {/* Catch-all route for invalid paths */}
        <Route
          path='*'
          element={<div>Page not found</div>}
        />
      </Routes>
    </div>
  );
}

export default App;
