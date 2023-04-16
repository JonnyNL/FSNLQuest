import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileStats({ onClose }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/currentUser");
        const currentUser = await response.json();
        setCurrentUser(currentUser);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  if (!currentUser) {
    return null;
  }

  const {
    userName,
    fName,
    lName,
    gender,
    questscompleted,
    questscreated,
    rewards,
  } = currentUser;

  const resetCurrentUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/currentUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Default user stats
          userName: "",
          fName: "",
          lName: "",
          gender: "",
          questscompleted: 0,
          questscreated: 0,
          rewards: [],
        }),
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error resetting current user:", error);
    }
  };

  const handleLogout = async () => {
    await resetCurrentUser();
    onClose();
    navigate("/");
  };

  return (
    <div className="profile-stats">
      <p>{userName}</p>
      <p>
        {fName} {lName}
      </p>
      <p>
        Quests Completed: {questscompleted} Quests Created: {questscreated}
      </p>
      <p>Rewards: {rewards.length}</p>
      <button className="logbuttonC" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default ProfileStats;
