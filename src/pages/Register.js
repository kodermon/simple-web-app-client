import axios from "axios";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BiError } from "react-icons/bi";

const notifyRegisterSuccessful = () =>
  toast.success("Account successfully created");

const Register = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    job: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMessage(null);
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters");
    } else if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      try {
        const config = { headers: { "Content-type": "application/json" } };
        const { firstName, lastName, email, password, job } = formData;
        const { data } = await axios.post(
          "/api/auth/register",
          {
            firstName,
            lastName,
            firstName,
            lastName,
            email,
            password,
            job,
          },
          config
        );
        notifyRegisterSuccessful();
        navigate("/profile", { replace: true });
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div style={{ minHeight: "87vh" }} className="register">
      <Toaster position="bottom-center" reverseOrder={false} />
      {loading && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      <h1 className="section-title">Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName"></label>
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          value={formData.firstName}
          required
        />
        <label htmlFor="lastName"></label>
        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          value={formData.lastName}
          required
        />
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <label htmlFor="job"></label>
        <input
          type="text"
          id="job"
          placeholder="Job"
          name="job"
          onChange={handleChange}
          value={formData.job}
          required
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <label htmlFor="confirmPassword"></label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
          required
        />
        {message && (
          <div className="error-wrapper">
            <BiError className="error-icon" />
            <p className="error-message">{message}</p>
          </div>
        )}
        <button className="register-btn">Sign Up</button>
        <p className="error-text"></p>
      </form>
      <p className="bottom-text">
        Already have an account? Login{" "}
        <Link to="/login" className="reg-here-btn">
          here
        </Link>
      </p>
    </div>
  );
};

export default Register;
