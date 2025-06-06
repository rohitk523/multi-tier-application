import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, getUser, logout } from '../utils/auth';

const Header: React.FC = () => {
  const user = getUser();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="nav-brand">
            E-Commerce App
          </Link>
          
          <ul className="nav-links">
            {authenticated ? (
              <>
                <li>
                  <Link to="/products" className="nav-link">
                    Products
                  </Link>
                </li>
                <li>
                  <span className="nav-link">
                    Welcome, {user?.name}
                  </span>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-secondary"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 