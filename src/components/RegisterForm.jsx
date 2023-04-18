// Author: Jonathan Ivany 2023-04-15

// Import required libraries and components
import React, { useState } from "react";
import NewUser from "./NewUser";
import GenderSelect from "./GenderSelect";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ users, addUser }) => {
  // Define state variables using the useState hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [gender, setGender] = useState("other");
  const [profileIMG, setProfileIMG] = useState("");
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({});
  const [fieldSuccess, setFieldSuccess] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  // Check that all fields have been filled in
  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!username) {
      errors.username = true;
      isValid = false;
    }
    if (!password) {
      errors.password = true;
      isValid = false;
    }
    if (!passwordVerify) {
      errors.passwordVerify = true;
      isValid = false;
    }
    if (!fName) {
      errors.fName = true;
      isValid = false;
    }
    if (!lName) {
      errors.lName = true;
      isValid = false;
    }
    if (!areaCode) {
      errors.areaCode = true;
      isValid = false;
    }
    // Set the fieldError state variable to the errors object
    setFieldError(errors);
    // If the form is not valid, display an error message and return false
    if (!isValid) {
      setError("Please fill in all the fields.");
      return false;
    }
    // Match passwords to make sure user knows what they typed
    if (password !== passwordVerify) {
      setError("Passwords don't match.");
      return false;
    }
    // If the form is valid, set the 'fieldSuccess' state variable and return true
    if (isValid) {
      setFieldSuccess({
        username: true,
        password: true,
        passwordVerify: true,
        fName: true,
        lName: true,
        areaCode: true,
      });
    }

    return isValid;
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // If the form is not valid, return
    if (!validateForm()) {
      return;
    }
    // Create a new user object using the NewUser class and the form data
    const newUser = new NewUser(
      username,
      password,
      fName,
      lName,
      areaCode,
      gender,
      profileIMG
    );
    // Call the 'addUser' function passed as a prop to add the new user to the 'users' array
    // and handle any errors with the 'setError' function
    const isSuccess = await addUser(newUser, setError);

    if (isSuccess) {
      // If user was successfully added, reset form fields and display success message
      setUsername("");
      setPassword("");
      setPasswordVerify("");
      setFName("");
      setLName("");
      setAreaCode("");
      setGender("other");
      setSuccessMessage("Account Successfully Created");
      // Add a delay of 1 second (1000 ms) before navigating
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username:</label>
        <input
          className={`inputfield${fieldError.username ? " input-error" : ""}${
            fieldSuccess.username ? " input-success" : ""
          }`}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <div className="form-group-row">
          <div className="form-group-column">
            <label>Password:</label>
            <input
              className={`inputfield${
                fieldError.password ? " input-error" : ""
              }${fieldSuccess.password ? " input-success" : ""}`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group-column">
            <label>Verify Password:</label>
            <input
              className={`inputfield${
                fieldError.passwordVerify ? " input-error" : ""
              }${fieldSuccess.passwordVerify ? " input-success" : ""}`}
              type="password"
              value={passwordVerify}
              onChange={(e) => setPasswordVerify(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="form-group-row">
          <div className="form-group-column">
            <label>First Name:</label>
            <input
              className={`inputfield${fieldError.fName ? " input-error" : ""}${
                fieldSuccess.fName ? " input-success" : ""
              }`}
              type="text"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
          </div>
          <div className="form-group-column">
            <label>Last Name:</label>
            <input
              className={`inputfield${fieldError.lName ? " input-error" : ""}${
                fieldSuccess.lName ? " input-success" : ""
              }`}
              type="text"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Area Code:</label>
        <input
          className={`inputfield${fieldError.areaCode ? " input-error" : ""}${
            fieldSuccess.areaCode ? " input-success" : ""
          }`}
          type="text"
          value={areaCode}
          onChange={(e) => setAreaCode(e.target.value)}
        />
      </div>
      <div
        style={{
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label>Gender:</label>
        <GenderSelect gender={gender} onGenderChange={setGender} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {error && <div className="error">{error}</div>}
        {successMessage && (
          <div style={{ color: "green" }}>
            Account Creation Success! redirecting...
          </div>
        )}
        <button className="logbutton" type="submit">
          Create Account
        </button>
        <button
          className="logbuttonC"
          type="button"
          onClick={() => navigate("/")}
          style={{ marginTop: "10px" }}
        >
          Nevermind
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
