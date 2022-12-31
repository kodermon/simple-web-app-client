import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/profile");
    }
  }, []);

  return (
    <div className="landing-main">
      <div>
        <div className="landing-text">
          <h1>Welcome to Simple Web App</h1>
        </div>
        <div className="btn-container">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/register">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
