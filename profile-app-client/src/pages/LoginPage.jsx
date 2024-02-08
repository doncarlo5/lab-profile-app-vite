import React from 'react';
import './LoginPage.css';
import { useState, useContext } from 'react';
import myApi from '../api/apiHandler';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });
  const { authenticateUser, storeToken } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await myApi.post('/auth/login', formState);
      console.log(response.data);
      storeToken(response.data.authToken);
      // localStorage.setItem('token', response.data.authToken);
      await authenticateUser();
    } catch (error) {
      console.log(error);
      // setError(error.response.data.message);
      // setTimeout(() => {
      //   setError(null);
      // }, 3000);
    }
  };
  console.log('here');
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [key]: value });
  };

  return (
    <div className="Login-page">
      <div className="form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formState.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button>Log In</button>
        </form>
        {error && <p>{error}</p>}
      </div>
      <div className="info">
        <div className="info-top">
          <h1>Hello!</h1>
          <p>Awesome to have at IronProfile again!</p>
        </div>
        <div className="info-bottom">
          <p>
            If you signup, you agree with all our terms and conditions where we
            can do whatever we want with the data!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
