import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BiError } from "react-icons/bi";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const notifyUpdateSuccess = () => toast.success("Updated successfully");
const notifyUpdateFail = () => toast.danger("Update fail");
const notifyDeleteSuccess = () =>
  toast.success("Your account has been deleted successfully");
const notifyDeleteError = () => toast.danger("Error deleting account");

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    job: "",
  });

  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setPicture(userInfo.picture);
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          job: userInfo.job,
        };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const cloudinaryUpload = (pic) => {
    if (!pic) {
      return setMessage("Please upload a picture ");
    }
    setMessage(null);

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "simplewebapp");
      data.append("cloudinary_name", "dbsm7i9ri");
      fetch("https://api.cloudinary.com/v1_1/dbsm7i9ri/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          setPicture(data.url.toString());
        })
        .catch((err) => console.log(err));
    } else {
      setMessage("Please select an image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { firstName, lastName, email, password, job } = formData;
      const { data } = await axios.post(
        "/api/user/profile/edit",
        {
          firstName,
          lastName,
          email,
          job,
          picture,
        },
        config
      );

      setLoading(false);

      notifyUpdateSuccess();
      localStorage.setItem("userInfo", JSON.stringify(data));
      window.location.reload();
    } catch (error) {
      setLoading(false);

      notifyUpdateFail();
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(
        `/api/user/profile/${userInfo._id}`,
        config
      );

      setLoading(false);

      notifyDeleteSuccess();
      localStorage.removeItem("userInfo");
      navigate("/");
    } catch (error) {
      console.log(error);

      setLoading(false);
      notifyDeleteError();
    }
  };

  return (
    <div style={{ minHeight: "87vh" }}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="edit-page">
        {loading && (
          <div className="spinner">
            <Spinner />
          </div>
        )}
        <h1 className="section-title">Edit Profile</h1>
        <div className="container">
          <div className="edit-picture-column">
            <img
              src={picture}
              alt="profile picture"
              className="edit-profile-picture"
            />
            <label htmlFor="file" className="upload-picture-btn">
              Change profile picture
            </label>
            <input
              id="file"
              type="file"
              onChange={(e) => cloudinaryUpload(e.target.files[0])}
              style={{ display: "none" }}
            />
            {message && (
              <div className="error-wrapper">
                <BiError className="error-icon" />
                <p className="error-message">{message}</p>
              </div>
            )}
          </div>

          <div className="form-column">
            <form className="edit-form">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
              <label htmlFor="job">Job:</label>
              <input
                type="text"
                id="job"
                placeholder="Job"
                name="job"
                onChange={handleChange}
                value={formData.job}
              />
            </form>
          </div>
        </div>
        <div className="edit-btns">
          <Button onClick={handleSubmit} className="update-btn">
            Update Profile
          </Button>{" "}
          <Button
            variant="danger"
            onClick={handleDelete}
            className="delete-btn"
          >
            Delete Profile
          </Button>
        </div>
        <div className="back-btn-container">
          <Button onClick={() => navigate("/profile")} className="go-back-btn">
            <BsFillArrowLeftCircleFill className="go-back-icon" /> Profile page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
