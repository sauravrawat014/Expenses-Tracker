import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import {message} from 'antd';

export default function Header(){

  const [loginUser, setloginUser] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{

    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      setloginUser(user);
    }

  },[]);

  const logoutHandler = ()=>{
    localStorage.removeItem('user');
    message.success("Logout Successfully");
    navigate("/login");
  }
    return(
        <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">Expense Tracker</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <p class="nav-link active">{loginUser && loginUser.name}</p>
        </li>

        <li class="nav-item">
          <button class="btn btn-primary" onClick={logoutHandler}>Logout</button>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>
        </>
    )
}