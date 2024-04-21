import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../Components/Card';
import Input from '../Components/Input';
import Button from '../Components/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../Components/validators';
import { useForm } from '../Components/form-hook';
import { AuthContext } from '../Components/context/auth-context';
import './Auth.css';

const Auth = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username:'',
    password:'',
    email:'',
  })

  const login = async () => {
    console.log("Login Function Executed");
  }
  const signup = async () => {
    console.log("signup Function Executed");

  }
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();
    try {
      const response = await fetch(isLoginMode ? '/login' : '/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        })
      });
      const responseData = await response.json();
      if (responseData.success) {
        // Handle successful login/signup here
        auth.login(responseData.token);
      } else {
        // Handle error responses here
        console.log(responseData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors here
    }
  };

  return (
    <Card className="authentication">
      <h2>Glownius</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text" 
            placeholder="   Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          placeholder="   E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          placeholder="   Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button><br /><br /><br />
      <NavLink to="/forgot-password" className='auth-forgot-password'>Forgot Password?</NavLink>
    </Card>
  );
};

export default Auth;
