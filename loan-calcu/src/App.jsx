import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import './App.css';

/**
 * Main App component that handles navigation between different pages
 * Simple state-based routing for a professional loan calculator
 */
function App() {
  // State to track current active page
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle login (just UI, no real authentication)
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  // Navigation component
  const Navigation = () => {
    if (!isLoggedIn) return null;

    return (
      <nav className="navbar">
        <div className="nav-container">
          <h2 className="nav-logo">Loan Calcu</h2>
          <div className="nav-links">
            <button 
              className={currentPage === 'home' ? 'nav-link active' : 'nav-link'}
              onClick={() => setCurrentPage('home')}
            >
              Calculator
            </button>
            <button 
              className={currentPage === 'contact' ? 'nav-link active' : 'nav-link'}
              onClick={() => setCurrentPage('contact')}
            >
              Contact
            </button>
            <button 
              className={currentPage === 'blogs' ? 'nav-link active' : 'nav-link'}
              onClick={() => setCurrentPage('blogs')}
            >
              Resources
            </button>
            <button className="nav-link logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    );
  };

  // Render current page based on state
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'home':
        return <Home />;
      case 'contact':
        return <Contact />;
      case 'blogs':
        return <Blogs />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="App">
      <Navigation />
      <main className="main-content">
        <div className="content-wrapper">
          {renderCurrentPage()}
        </div>
      </main>
    </div>
  );
}

export default App;