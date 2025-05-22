import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { message } from 'antd';

export default function Header() {
  const [loginUser, setLoginUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('user');
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Expense Tracker</Link>
        
       
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {loginUser && (
              <>
                <li className="nav-item">
                  <span className="nav-link">{loginUser.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary ms-2" onClick={logoutHandler}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
        
        
        {loginUser && (
          <div className="d-flex d-lg-none align-items-center">
            <span className="me-2">{loginUser.name}</span>
            <button className="btn btn-primary btn-sm" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
