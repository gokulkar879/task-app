import React from 'react';
import { Link } from "react-router-dom";
import { useUserContext } from '../UserContext';


function Header() {

  const { sessionId, logout, currentUser } = useUserContext();

  const handleLogout = ev => {
     logout();
  }
  return (
    <header>
        <Link to="/" className='logo'>MyTask</Link>
        {
          (sessionId) ? <nav> 
                              <Link to="/">{currentUser && currentUser.name}</Link>
                              <button onClick={handleLogout} className='logout-btn'>Logout</button>
                            </nav> : <nav>
                                          <Link to="/login">Login</Link>
                                          <Link to="/register">Register</Link>
                                      </nav>
        }
    </header>
  )
}

export default Header;