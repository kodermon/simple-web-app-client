import React from "react";

const Profile = () => {
  let userInfo;
  if (localStorage.getItem("userInfo")) {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
  }
  return (
    <div className="profile">
      <div className="profile-picture">
        <img
          src={userInfo.picture}
          alt="profile.picture"
          className="profile-picture"
        />
      </div>
      <div className="user-name">
        <h1>{userInfo.firstName}</h1>
        <h1>{userInfo.lastName}</h1>
      </div>
      <h3>{userInfo.job}</h3>
      <h3 className="user-email">{userInfo.email}</h3>
    </div>
  );
};

export default Profile;
