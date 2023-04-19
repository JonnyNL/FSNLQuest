// Author: Jonathan Ivany

// The purpose of this component is to render a navbar that will have the users profile,
// which when clicked will open up the users stats, this is rendered through ProfileStats
// To the right is a create quest button navigating to a page where users can create a new quest
// Next to that is a quest flag that navigates users to their quests pagew which shows accepted and created quests

import React, { useState, useEffect } from "react";
import AvatarMale from "../site-images/AvatarMale.png";
import AvatarFemale from "../site-images/AvatarFemale.png";
import AvatarOther from "../site-images/AvatarOther.png";
import ProfileStats from "./ProfileStats";
import { GiBlackFlag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [username, setUsername] = useState("");
  const [imgPath, setImgPath] = useState("");
  const navigate = useNavigate();

  // Early version way of setting the users profile picture
  const getAvatarImage = (gender) => {
    switch (gender) {
      case "male":
        return AvatarMale;
      case "female":
        return AvatarFemale;
      case "other":
        return AvatarOther;
      default:
        return AvatarOther;
    }
  };

  // Fetch users data from current logged in user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/currentUser");
        const currentUser = await response.json();
        setUsername(currentUser.userName); // Set the username to display on welcome message
        setImgPath(getAvatarImage(currentUser.gender)); // Set the avatar image based on the user's gender
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const [showProfileStats, setShowProfileStats] = useState(false);

  // Function to display the profile stats
  const toggleProfileStats = () => {
    setShowProfileStats(!showProfileStats);
  };

  // Function to close the profile stats
  const closeProfileStats = () => {
    setShowProfileStats(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={imgPath} // Use the imgPath state for the image source
          alt="User Profile"
          className={`navbar-user-image${showProfileStats ? " active" : ""}`}
          onClick={toggleProfileStats}
        />
        <p>
          Beautiful day for a Quest, <span className="UserN">{username}</span>!
        </p>
        {showProfileStats && <ProfileStats onClose={closeProfileStats} />}
      </div>
      <div className="navbar-right">
        <button
          className="navbar-create-quest-button"
          onClick={() => {
            navigate("/create");
          }}
        >
          Create Quest
        </button>
        <div
          className="navbar-notifier"
          onClick={() => {
            navigate("/yourquests");
          }}
        >
          <GiBlackFlag style={{ size: "40" }} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
