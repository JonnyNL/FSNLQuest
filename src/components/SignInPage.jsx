// Author: Jonathan Ivany 2023/04/10

// The purpose of this SignInPage is to let users sign in if they have credentials to access the rest of the site, or they
// can view info on the site or navigate to create an account.

// Import required libraries and components
import React, { useState } from "react";
import Logo from "../site-images/NLQuestLogo.png";
import "../backgrounds.css";
import "../fonts.css";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [noAccFound, setNoAccFound] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Add new state to store the current user object

  const navigate = useNavigate(); // Add useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/users");
    const users = await response.json();
    const user = users.find(
      (u) => u.userName === username && u.passWord === password
    );
    if (user) {
      setCurrentUser(user); // Save the matched user object to the state
      await writeCurrentUserToFile(user); // Write the matched user object to user.json
      navigate("/landing"); // Navigate to the landing page
    } else {
      setNoAccFound(true);
    }
  };

  const writeCurrentUserToFile = async (user) => {
    await fetch("http://localhost:5000/currentUser", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  return (
    <div className="sCenter">
      <div className="sibackground">
        <div>
          <form className="box" onSubmit={handleSubmit}>
            <img src={Logo} width="325px" height="325px" alt="NL QUEST"></img>

            <label>
              Username <br />
              <input
                className="inputfield"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />

            <label>
              Password <br />
              <input
                className="inputfield"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <br />
            <button className="logbutton" type="submit">
              Log In!
            </button>
            <br />
            {noAccFound && <div>No Account found</div>}
            <Link to="/register">
              <a className="links" href="/register">
                Create an account
              </a>
            </Link>
          </form>
        </div>
        <div className="fsloppy">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
