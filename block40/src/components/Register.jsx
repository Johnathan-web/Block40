import React, { useState } from "react";



const Register = () => {
  const [usernameInput, setUsernameInput] = useState(''); 
  const [passwordInput, setPasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [fNameInput, setFNameInput] = useState(''); 
  const [error, setError] = useState('');
  

  const register = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameInput,
          email: emailInput,
          first_name: fNameInput,
          password: passwordInput,
        }),
      });
  
      if (response.status === 201) {
        window.location.href = '/canvas';
      } else {
        setError('Failed to create user');
      }
    } catch (err) {
      setError('Could not log in');
    }
  };
  

  return (
    <>
          <form onSubmit={register}>
            <input
              type="username"
              placeholder="username"
              value={usernameInput}
              onChange={((event) => setUsernameInput(event.target.value))}
              />
            <input
              type="email"
              placeholder="email"
              value={emailInput}
              onChange={((event) => setEmailInput(event.target.value))}
              />
            
            <input
            placeholder="first name"
            value={fNameInput}
            onChange={((event) => setFNameInput(event.target.value))}
            />

            <input
              type="password"
              placeholder="password"
              value={passwordInput}
              onChange={((event) => setPasswordInput(event.target.value))}
              />

            <button id='modal-register' type="submit">Register</button>
            
          </form>
        </>
    );
  };
  
  export default Register;
  