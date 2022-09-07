import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext.js";
import Pen from "../../images/Edit_icon.svg";
import Mail from "../../images/Email_icon.svg";
import Lock from "../../images/Lock_icon.svg";
import Eye from "../../images/Eye_icon.svg";
import "./settings.css";
import Header from "../Header/Header.js";

export default function Settings() {
  const {
    currentUser,
    updateUser,
    updateUsersEmail,
    updateUsersPassword,
    userDetails,
    upload,
  } = useAuth();
  const [error, setError] = useState("");

  const [data, setData] = useState({
    photoURL: "",
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    dateOfBirth: userDetails.dateOfBirth,
    mobileNumber: userDetails.mobileNumber,
    email: userDetails.email,
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    setData({
      photoURL: currentUser.photoURL,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      dateOfBirth: userDetails.dateOfBirth,
      mobileNumber: userDetails.mobileNumber,
      email: userDetails.email,
      password: "",
      passwordConfirm: "",
    });
  }, [userDetails]);

  const [editSettings, setEditSettings] = useState(false);

  const [passwordInput, setPasswordInput] = useState("password");

  async function handleSubmit(e) {
    setError("");
    e.preventDefault();
    const {
      firstName,
      lastName,
      dateOfBirth,
      mobileNumber,
      email,
      password,
      passwordConfirm,
    } = data;

    if (email) {
      try {
        await updateUsersEmail(email);
        await updateUser({
          firstName,
          lastName,
          dateOfBirth,
          mobileNumber,
          email,
        });
      } catch (err) {
        setError("Something went wrong!");
      }
    }
    if (password && password === passwordConfirm) {
      try {
        updateUsersPassword(password);
      } catch {
        setError("Something went wrong!");
      }
    }
    setEditSettings(false);
  }

  function handleInput(e) {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {}, [data]);

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  function handlePicture(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  async function handleUpload() {
    upload(photo, currentUser, setLoading);
  
  }

  // useEffect(() => {
  //   if (currentUser?.photoURL) {
  //     setPhotoURL(currentUser.photoURL);
  //   }
  // }, [currentUser]);

  console.log(photoURL);
  console.log(photo);

  return (
    <div className="settings-container">
      <Header />

      <div className="main-container">
        <h2 className="subtitle-acc">Account Information</h2>
        <p className="subtitle-details">Update your account information</p>

        <section className="personal-info">
          <h2 className="subtitle-pers">Personal Information</h2>
          <button
            className="edit-btn"
            onClick={e => {
              setEditSettings(prev => !prev);
              e.preventDefault();
            }}
          >
            <img src={Pen} className="pen-icon" alt="" />
            Edit
          </button>
        </section>

        <form className="form-info" onSubmit={event => handleSubmit(event)}>
          <section className="form-wrap">
            <label className="label label-dp">Profile Picture</label>
            <div className="form-column pp-container">
              {editSettings ? (
                <>
                  {" "}
                  <input
                    disabled={!editSettings}
                    className="input-dp"
                    type="file"
                    name="displayPicture"
                    placeholder="Upload Image"
                    onChange={handlePicture}
                    // value={data.photoURL}
                  />
                  <button
                    onClick={handleUpload}
                    className="upload-dp-btn"
                    // value={data.displayPicture}
                  >
                    Upload Image
                  </button>
                </>
              ) : (
                <img src={data.photoURL} className="profile-picture" />
              )}
            </div>

            <div className="form-column">
              <label className="label label-fname">First Name</label>
              <input
                disabled={!editSettings}
                className="input input-fname"
                type="text"
                name="firstName"
                onChange={handleInput}
                value={data.firstName}
              />
            </div>

            <div className="form-column">
              <label className="label label-lname">Last Name</label>
              <input
                disabled={!editSettings}
                className="input input-lname"
                type="text"
                name="lastName"
                onChange={handleInput}
                value={data.lastName}
              />
            </div>

            <div className="form-column">
              <label className="label label-date">Date of birth</label>
              <input
                disabled={!editSettings}
                className="input input-date"
                type="date"
                name="dateOfBirth"
                onChange={handleInput}
                value={data.dateOfBirth}
              />
            </div>

            <div className="form-column">
              <label className="label label-phone">Mobile Number</label>
              <input
                disabled={!editSettings}
                className="input input-phone"
                name="mobileNumber"
                onChange={handleInput}
                value={data.mobileNumber}
              />
            </div>
            <div className="form-column span-two">
              <label className="label label-email">Email</label>
              <div
                className={
                  editSettings ? "mail-container-white" : "mail-container"
                }
              >
                <img src={Mail} className="mail-icon" alt="" />
                <input
                  disabled={!editSettings}
                  className={editSettings ? "mail-input-w" : "mail-input"}
                  type="email"
                  name="email"
                  onChange={handleInput}
                  value={data.email}
                />
              </div>
            </div>

            <div className="form-column">
              <label className="label label-pass">New Password</label>
              <div
                className={
                  editSettings ? "pass-container-white" : "pass-container"
                }
              >
                <img src={Lock} className="lock-icon" alt="" />
                <input
                  disabled={!editSettings}
                  className={editSettings ? "pass-input-w" : "pass-input"}
                  type={passwordInput}
                  name="password"
                  onChange={handleInput}
                  placeholder="·······"
                />
                <button
                  onClick={e => {
                    setPasswordInput(prev =>
                      prev === "password" ? "text" : "password"
                    );
                    e.preventDefault();
                  }}
                  className="eye-btn"
                >
                  <img src={Eye} className="eye-icon" alt="" />
                </button>
              </div>
            </div>

            <div className="form-column">
              <label className="labellabel-pass">Confirm Password</label>
              <div
                className={
                  editSettings ? "pass-container-white" : "pass-container"
                }
              >
                <img src={Lock} className="lock-icon" alt="" />
                <input
                  disabled={!editSettings}
                  className={editSettings ? "pass-input-w" : "pass-input"}
                  type={passwordInput}
                  name="password"
                  onChange={handleInput}
                  placeholder="·······"
                />
                <button
                  onClick={e => {
                    setPasswordInput(prev =>
                      prev === "password" ? "text" : "password"
                    );
                    e.preventDefault();
                  }}
                  className="eye-btn"
                >
                  <img src={Eye} className="eye-icon" alt="" />
                </button>
              </div>
              <p>{error.password}</p>
            </div>
          </section>

          {editSettings && (
            <button
              disabled={!editSettings}
              onClick={e => handleSubmit(e)}
              className="update-btn"
            >
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
