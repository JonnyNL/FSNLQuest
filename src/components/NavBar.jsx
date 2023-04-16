import React, { useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import AvatarMale from "../site-images/AvatarMale.png";
import AvatarFemale from "../site-images/AvatarFemale.png";
import AvatarOther from "../site-images/AvatarOther.png";
import ProfileStats from "./ProfileStats";
import { GiBlackFlag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [username, setUsername] = useState("");
  const [imgPath, setimgPath] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/currentUser");
        const currentUser = await response.json();
        setUsername(currentUser.userName);
        setimgPath(currentUser.imgPath);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const [showProfileStats, setShowProfileStats] = useState(false);

  const toggleProfileStats = () => {
    setShowProfileStats(!showProfileStats);
  };

  const closeProfileStats = () => {
    setShowProfileStats(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={AvatarMale}
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
        <div className="navbar-notifier">
          <GiBlackFlag style={{ size: "40" }} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
