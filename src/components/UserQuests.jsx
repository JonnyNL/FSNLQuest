import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserQuests.css";

const UserQuests = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [quests, setQuests] = useState([]);
  const [tab, setTab] = useState("yourCreations");
  const navigate = useNavigate();
  useEffect(() => {
    fetchCurrentUser();
    fetchQuests();
  }, []);

  const fetchCurrentUser = async () => {
    const response = await fetch("http://localhost:5000/currentUser");
    const user = await response.json();
    setCurrentUser(user);
  };

  const fetchQuests = async () => {
    const response = await fetch("http://localhost:5000/quests");
    const questsData = await response.json();
    setQuests(questsData);
  };

  const deleteQuest = async (questId) => {
    await fetch(`http://localhost:5000/quests/${questId}`, {
      method: "DELETE",
    });
    fetchQuests();
  };

  const abandonQuest = async (questId) => {
    const updatedUser = {
      ...currentUser,
      acceptedQuests: currentUser.acceptedQuests.filter((id) => id !== questId),
    };

    await fetch(`http://localhost:5000/users/${currentUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    await fetch(`http://localhost:5000/currentUser`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    setCurrentUser(updatedUser);
  };

  const renderYourCreations = () => {
    if (!currentUser) return null;

    const userQuests = quests.filter((quest) =>
      currentUser.questscreated.includes(quest.id)
    );

    return userQuests.map((quest) => (
      <div className="quest" key={quest.id}>
        <h3>{quest.title}</h3>
        <button onClick={() => deleteQuest(quest.id)}>Delete</button>
      </div>
    ));
  };
  // Function to render quests based on users quest accepted
  // also allows user to quit the quest
  const renderOngoingQuests = () => {
    if (!currentUser) return null;

    const ongoingQuests = quests.filter((quest) =>
      currentUser.acceptedQuests.includes(quest.id)
    );

    return ongoingQuests.map((quest) => (
      <div className="quest" key={quest.id}>
        <h3>{quest.title}</h3>
        <button onClick={() => abandonQuest(quest.id)}>Abandon</button>
      </div>
    ));
  };
  // Function to return the user back to landing
  const handleBackToQuesting = () => {
    navigate("/landing");
  };

  return (
    <div className="container">
      <div className="tabs">
        <button
          className={`tab ${tab === "yourCreations" ? "active" : ""}`}
          onClick={() => setTab("yourCreations")}
        >
          Your Creations
        </button>
        <button
          className={`tab ${tab === "ongoingQuests" ? "active" : ""}`}
          onClick={() => setTab("ongoingQuests")}
        >
          Ongoing Quests
        </button>
      </div>
      <div className="content">
        {tab === "yourCreations" && renderYourCreations()}
        {tab === "ongoingQuests" && renderOngoingQuests()}
      </div>
      <button className="back-to-questing" onClick={handleBackToQuesting}>
        Get Back To Questing
      </button>
    </div>
  );
};

export default UserQuests;
