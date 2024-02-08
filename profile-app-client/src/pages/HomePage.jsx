import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function Home() {
  return (
    <div className="homepage">
      <h1 className="title">IronProfile</h1>
      <p className="description">
        Today we will create an app with authoritation, adding some cool styles!
      </p>
      <Link className="button" to="/signup">
        Sign up
      </Link>
      <Link className="button" to="/login">
        Log in
      </Link>
    </div>
  );
}

export default Home;
