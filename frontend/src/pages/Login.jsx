import { Form, Input,message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../components/layouts/Spinner';
import axios from 'axios';

export default function Login(){

    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);

    const submitHandler = async(values)=>{

        try{
            setLoading(true);
        const {data} = await axios.post("http://localhost:8080/api/v1/users/login", values);
        message.success("Login Successful", 5);
        localStorage.setItem('user', JSON.stringify({...data.user,password:''}));
        setLoading(false);
        navigate("/");
        } catch(error){
            setLoading(false);
            message.error("Login Failed");

        }
    }

      useEffect(()=>{
            if(localStorage.getItem('user')){
                navigate("/");
            }
    
        }, [navigate]);
    
    return(
        <>
        <div className="register">
            {loading && <Spinner/>}

<Form layout='vertical' onFinish={submitHandler}>
    <h1>Login Form</h1>

    

    <Form.Item label="Email" name="email">
        <Input type='email'/>

    </Form.Item>

    <Form.Item label="Password" name="password">
        <Input type='password'/>

    </Form.Item>

    <div className='d-flex'>
        <Link to="/register">Not A User - Click Here To Register</Link>
    </div>
    <button className='btn btn-primary'>Login</button>

</Form>

</div>
        </>
    )
}