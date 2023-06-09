// Author: Jonathan Ivany

// THe purpose of this component is to render a quest card for every quest made, it will have the same functionalities as the featured component
// except it will also display upcoming quests but have the button greyed out as "Unavailable"

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiChest } from "react-icons/gi";

const UserMade = () => {
  const [quests, setQuests] = useState([]);
  const navigate = useNavigate();
  const [acceptedQuests, setAcceptedQuests] = useState(new Set());
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchQuestsAndCurrentUser = async () => {
      const response = await fetch("http://localhost:5000/quests");
      const data = await response.json();
      setQuests(data);

      const currentUserResponse = await fetch(
        "http://localhost:5000/currentUser"
      );
      const currentUserData = await currentUserResponse.json();
      setCurrentUser(currentUserData);
      setAcceptedQuests(new Set(currentUserData.acceptedQuests)); // Fix here
    };

    fetchQuestsAndCurrentUser();
  }, []);

  const handleButtonClick = async (quest) => {
    if (!acceptedQuests.has(quest.id)) {
      setAcceptedQuests((prevAcceptedQuests) => {
        const newAcceptedQuests = new Set(prevAcceptedQuests);
        newAcceptedQuests.add(quest.id);
        return newAcceptedQuests;
      });

      const currentUserResponse = await fetch(
        "http://localhost:5000/currentUser"
      );
      const currentUser = await currentUserResponse.json();

      const updatedUserData = {
        ...currentUser,
        acceptedQuests: [...currentUser.acceptedQuests, quest.id],
      };

      await fetch(`http://localhost:5000/users/${currentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      await fetch("http://localhost:5000/currentUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });
    } else {
      navigate("/steps", { state: { questId: quest.id } });
    }
  };
  // Function that renders the quest into a quest card and assigns the corresponding button and data
  const renderQuest = (quest) => {
    const questAccepted = acceptedQuests.has(quest.id);
    const isQuestCreatedByCurrentUser =
      currentUser && currentUser.questscreated.includes(quest.id);
    const isQuestAvailable =
      !quest.sDate ||
      new Date(quest.sDate).setHours(0, 0, 0, 0) <=
        new Date().setHours(0, 0, 0, 0);
    // Function that checks how the quest relates to the user and renders the corresponding button
    const getButtonLabel = () => {
      if (isQuestCreatedByCurrentUser) return "Your Quest";
      if (!isQuestAvailable) return "Not Yet Available";
      return questAccepted ? "View Steps" : "Accept Quest";
    };
    // Function that sets the class of the button dependng on the buttons label
    // which came from the above function
    const getButtonClass = () => {
      if (isQuestCreatedByCurrentUser || getButtonLabel() === "View Steps") {
        return "yourQuest";
      }
      if (getButtonLabel() === "Accept Quest") {
        return "acceptQuest";
      }
      return "";
    };
    // Function to route user to their quests with the button if they created the quest card
    const handleQuestButtonClick = () => {
      if (isQuestCreatedByCurrentUser) {
        navigate("/yourquests");
      } else {
        handleButtonClick(quest);
      }
    };
    return (
      <div className="usermade">
        <div className="questCard">
          <img className="questImg" src={quest.thumbnail} alt={quest.title} />
          <div className="topmiddle">
            <h3 style={{ textAlign: "center" }}>{quest.title}</h3>
          </div>
          <div className="roundmiddle"></div>
          <div className="bottommiddle">
            <p style={{ textAlign: "center" }}>
              <span className="iChest">
                <GiChest />
              </span>{" "}
              <span className="userrewardq">{quest.reward} </span>
              <span className="iChest">
                <GiChest />
              </span>
            </p>
          </div>
          <div className="questDescription">
            <p>{quest.description}</p>
            <button
              onClick={handleQuestButtonClick}
              disabled={!isQuestAvailable && !isQuestCreatedByCurrentUser}
              className={getButtonClass()}
            >
              {getButtonLabel()}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="userquests">
      <div className="row">{quests.map((quest) => renderQuest(quest))}</div>
    </div>
  );
};

export default UserMade;
