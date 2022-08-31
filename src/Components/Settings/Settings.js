import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/RequireAuth.js";
import Pen from "../../images/Edit_icon.svg";
import Mail from "../../images/Email_icon.svg";
import Lock from "../../images/Lock_icon.svg";
import Eye from "../../images/Eye_icon.svg";
import "./settings.css";
import Header from "../Header/Header.js";

export default function Settings() {
  const { updateUser, updateUsersEmail, updateUsersPassword, userDetails } =
    useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    setData({
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

  const [data, setData] = useState({});

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
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

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

        <form className="form-info">
          <section className="form-wrap">
            <div className="form-column">
              <label className="label label-fname">First Name</label>
              <input
                disabled={!editSettings}
                className="input input-fname"
                type="text"
                name="firstName"
                onChange={handleInput}
                value={data.firstName}
                placeholder={data.firstName}
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
                placeholder={data.lastName}
              />
            </div>

            <div className="form-column">
              <label className="label label-date">Date of birth</label>
              <input
                disabled={!editSettings}
                className="input input-date"
                type="date"
                name="dob"
                onChange={handleInput}
                placeholder={data.userBirth}
              />
            </div>

            <div className="form-column">
              <label className="label label-phone">Mobile Number</label>
              <input
                disabled={!editSettings}
                className="input input-phone"
                name="phone"
                onChange={handleInput}
                placeholder={data.phoneNumber}
              />
            </div>
          </section>

          <label className="label-email">Email</label>
          <div className="mail-container">
            <img src={Mail} className="mail-icon" alt="" />
            <input
              disabled={!editSettings}
              className="input-mail"
              type="email"
              name="email"
              onChange={handleInput}
              placeholder={data.userEmail}
            />
          </div>

          <section className="form-wrap">
            <div className="form-column">
              <label className="label-pass">New Password</label>
              <div className="pass-container">
                <img src={Lock} className="lock-icon" alt="" />
                <input
                  disabled={!editSettings}
                  className="pass-input"
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
                >
                  <img src={Eye} className="eye-icon" alt="" />
                </button>
              </div>
            </div>

            <div className="form-column">
              <label className="label-pass">Confirm Password</label>
              <div className="pass-container">
                <img src={Lock} className="lock-icon" alt="" />
                <input
                  disabled={!editSettings}
                  className="pass-input"
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
                >
                  <img src={Eye} className="eye-icon" alt="" />
                </button>
              </div>
              <p>{error.password}</p>
            </div>
          </section>

          <button
            disabled={!editSettings}
            onClick={e => handleSubmit(e)}
            className="update-btn"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
