import React from 'react';
import './LoginSignup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const navigate = useNavigate();
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        email:"",
    });

    const changeHandler = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };

    const login = async () =>{
        console.log("Login", formData);
        let responseData;
        await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        }).then((response)=> response.json()).then((data)=>responseData=data)
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.error)
        }
    };

    const signup = async () => {
        // Validation check for empty fields
        if (!formData.username || !formData.email || !formData.password) {
            alert("Please fill in all fields.");
            return;
        }
    
        // Validation check for email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        // Validation check for password criteria
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }
    
        console.log("Signup", formData);
        let responseData;
        await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData = data);
    
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData.error);
        }
    };
    
    
    const forgotPassword = () => {
     navigate('/forgotpass');
    };

    return (
        <div className='loginsignup'>
            <div className='loginsignup-container'>
                <h1>{state}</h1>
                <div className='loginsignup-fields'>
                    {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your First Name' required /> : <></>}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email' required />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' required />
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
                {state === "Sign Up" ?
                    <p className='loginsignup-login'>
                        Already have an Account? &nbsp;
                        <span className="login-link" onClick={() => { setState("Login") }}>Login here</span>
                    </p> :
                    <p className='loginsignup-login'>
                        Create an Account? &nbsp;
                        <span className="signup-link" onClick={() => { setState("Sign Up") }}>Click here</span>
                    </p>
                }
                <p className='forgot-password' onClick={forgotPassword}>Forgot Password?</p>
            </div>
        </div>
    );
}


export default LoginSignup;
