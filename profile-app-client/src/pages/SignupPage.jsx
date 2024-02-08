import React from 'react';
import './SignupPage.css';
import { useState, useContext } from 'react';
import myApi from '../api/apiHandler';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    campus: '',
    course: '',
  });

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await myApi.post('/auth/signup', formState);
      console.log(response.data);
      // localStorage.setItem('token', response.token);
      // await authenticateUser();
      navigate('/login');
    } catch (error) {
      console.log(error);
      //   setError(error.response.data.message);
      //   setTimeout(() => {
      //     setError(null);
      //   }, 3000);
    }
  };

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [key]: value });
  };

  return (
    <div className="signup-page">
      <div className="form">
        <h1>Signup</h1>
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
          <label htmlFor="campus">Campus</label>
          <input
            type="text"
            id="campus"
            value={formState.campus}
            onChange={handleChange}
            placeholder="Campus"
          />
          <label htmlFor="course">Course</label>
          <input
            type="text"
            id="course"
            value={formState.course}
            onChange={handleChange}
            placeholder="Course"
          />
          <button>Create the account</button>
        </form>
        {error && <p>{error}</p>}
      </div>
      <div className="info">
        <div className="info-top">
          <h1>Hello!</h1>
          <p>Welcome to IronProfile!</p>
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

export default Signup;
