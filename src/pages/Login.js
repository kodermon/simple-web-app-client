import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BiError } from "react-icons/bi";

const notifyLoginSuccesful = () => toast.success("Logged in successfully");

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = { headers: { "Content-type": "application/json" } };
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      notifyLoginSuccesful();

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/profile", { replace: true });
      setLoading(false);

      //console.log(data);
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.msg);
      console.log(error);
    }
  };

  return (
    <div className="login">
      <Toaster position="bottom-center" reverseOrder={false} />
      {loading && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      <h1 className="section-title">Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage(null);
          }}
          value={email}
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setMessage(null);
          }}
          value={password}
        />
        <button className="login-btn">Login</button>
      </form>
      {message && (
        <div className="error-wrapper">
          <BiError className="error-icon" />
          <p className="error-message">{message}</p>
        </div>
      )}
      <p className="bottom-text">
        Don't have an account? Register{" "}
        <Link to="/register" className="login-here-btn">
          here
        </Link>
      </p>
    </div>
  );
};

export default Login;
