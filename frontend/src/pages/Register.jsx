import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Spinner from '../components/layouts/Spinner';

export default function Register() {

    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);

    const submitHandler = async(value)=>{

        try{
            setLoading(true);
        await axios.post("https://expenses-tracker-ez61.onrender.com/api/v1/users/register", value);
        message.success("Registeration Successful");
        setLoading(false);
        navigate("/login");
        } catch(error){
            setLoading(false);
            message.error("Registeration Failed");

        }
    }

    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate("/");
        }

    }, [navigate]);


    return (
        <>

            <div className="register">

                {loading && <Spinner/>}

                <Form layout='vertical' onFinish={submitHandler}>
                    <h1>Register Form</h1>

                    <Form.Item label="Name" name="name">
                        <Input/>

                    </Form.Item>

                    <Form.Item label="Email" name="email">
                        <Input type='email'/>

                    </Form.Item>

                    <Form.Item label="Password" name="password">
                        <Input type='password'/>

                    </Form.Item>

                    <div className='d-flex'>
                        <Link to="/login">ALready Register ? Click Here To Login</Link>
                    </div>
                    <button className='btn btn-primary'>Register</button>

                </Form>

            </div>

        </>
    )
}
