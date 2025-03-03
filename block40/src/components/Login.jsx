import React, { useState } from "react";


const Login = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState('');

  const logIn = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      const token = await response.text();
      localStorage.setItem('token', token);
      setToken(token);
      setUsernameInput('');
      setPasswordInput('');
    } catch (err) {
      setError('Could not log in');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  }

  return (
    <>
      {token ? (
        <>
          <h1>Welcome!</h1>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </>
      ) : (
        <>
          {error}
          <form onSubmit={logIn}>
            <input
              id="login-input"
              placeholder="username"
              value={usernameInput}
              onChange={(event) => setUsernameInput(event.target.value)}
            />
            <input
              id="login-input"
              type="password"
              placeholder="password"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
            />
            <button id='modal-login' type="submit">Log In</button>
          </form>
        </>
      )}
    </>
  );
};

export default Login;