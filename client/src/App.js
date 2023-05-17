import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthorsList from './components/AuthorsList';
import Store from './components/Store';
import AddAuthor from './components/AddAuthor';
import About from './components/About';
import Admin from './components/Admin';
import Login from './components/Login';
import ProductManagement from './components/ProductManagement';
import PromotionNotification from './components/PromotionNotification'; // Import the PromotionNotification component

import './App.css';

function App() {
  return (
    <Router >
      <div className="App"  dir="rtl">
        <div className="header">
          <div className="title-buttons">
            <h1 className="title">המרכז העולמי לסופרי סת"ם</h1>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/" className="nav-link">כל החנויות</Link>
              </li>
              <li>
                <Link to="/add-author" className="nav-link">הרשמה לסופר חדש</Link>
              </li>
              <li>
                <Link to="/about" className="nav-link">אודות</Link>
              </li>
              <li>
                <Link to="/" className="nav-link">בית</Link>
              </li>
            </ul>
          </nav>
          <Link to="/login" className="admin-button">אזור אישי לסופרים</Link>
        </div>
      
        <Routes>
          <Route exact path="/" element={<AuthorsList />} />
          <Route path="/stores/:id" element={<Store />} />
          <Route path="/add-author" element={<AddAuthor />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-author" element={<AddAuthor />} />

          <Route exact path="/stores" component={AuthorsList} />
          <Route path="/stores/:storeId/products" element={<ProductManagement />} />
        </Routes>
        <div className="promotion-notification-wrapper">
            <PromotionNotification />
          </div>
      </div>
      <footer className="footer">
  <p className="footer-text">
    &copy; 2023 Your Website Name. All rights reserved. |{" "}
    <a href="/" className="footer-link">Terms of Service</a> |{" "}
    <a href="/" className="footer-link">Privacy Policy</a>
  </p>
</footer>

    </Router>
  );
}

export default App;
