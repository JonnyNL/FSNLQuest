// Importing the useState and useEffect hooks, as well as the GiChest icon and the useNavigate hook from react-router-dom
import React, { useState, useEffect } from "react";
import { GiChest } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

// Defining the Featured component
const Featured = () => {
  // Using the useState hook to manage state
  const [quests, setQuests] = useState([]);
  const [acceptedQuests, setAcceptedQuests] = useState(new Set());
  const navigate = useNavigate();

  // Using the useEffect hook to fetch quests from the server and rotate them every 10 seconds
  useEffect(() => {
    const fetchQuests = async () => {
      const response = await fetch("http://localhost:5000/quests");
      const data = await response.json();
      setQuests(selectRandomQuests(data, 3));

      const currentUserResponse = await fetch(
        "http://localhost:5000/currentUser"
      );
      const currentUser = await currentUserResponse.json();
      setAcceptedQuests(new Set(currentUser.acceptedQuests));
    };

    fetchQuests();

    const interval = setInterval(() => {
      setQuests((prevQuests) => rotateArray(prevQuests, 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Function to select n number of random quests
  const selectRandomQuests = (quests, n) => {
    // Get current date in 'yyyy-mm-dd' format
    const today = new Date().toISOString().split("T")[0];

    // Filter quests with an sDate equal to or earlier than today, or with sDate as null
    const availableQuests = quests.filter(
      (quest) => quest.sDate === null || quest.sDate <= today
    );

    const shuffled = availableQuests.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  // Function to rotate an array by count
  const rotateArray = (arr, count) => {
    return [...arr.slice(count), ...arr.slice(0, count)];
  };

  // Function to render a single quest
  const renderQuest = (quest, index) => {
    // Defining some CSS classes
    const topRowClass = ["topleftrow", "topmiddlerow", "toprightrow"];
    const roundRowClass = ["roundleftrow", "roundmiddlerow", "roundrightrow"];
    const bottomRowClass = [
      "bottomleftrow",
      "bottommiddlerow",
      "bottomrightrow",
    ];
    const questClass = ["leftquest", "middlequest", "rightquest"];

    // Defining some variables based on whether the user has accepted the quest or not
    const buttonText = acceptedQuests.has(quest.id)
      ? "View Steps"
      : "Accept Quest";

    const buttonClass = acceptedQuests.has(quest.id)
      ? "view-steps-button"
      : "accept-quest-button";

    // Function to handle the button click
    const handleButtonClick = async (quest) => {
      if (!acceptedQuests.has(quest.id)) {
        // Update the local state
        setAcceptedQuests((prevAcceptedQuests) => {
          const newAcceptedQuests = new Set(prevAcceptedQuests);
          newAcceptedQuests.add(quest.id);
          return newAcceptedQuests;
        });

        // Fetch the current user
        const currentUserResponse = await fetch(
          "http://localhost:5000/currentUser"
        );
        const currentUser = await currentUserResponse.json();

        // Update the user data with the accepted quest
        const updatedUserData = {
          ...currentUser,
          acceptedQuests: [...currentUser.acceptedQuests, quest.id],
        };

        // Send a request to update the user data on the server
        await fetch(`http://localhost:5000/users/${currentUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        });

        // Update the currentUser object in the server
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
    return (
      <div key={index} className={questClass[index]}>
        <div className={topRowClass[index]}>{quest.title}</div>
        <div className="image-container">
          <img
            className="quest-thumbnail"
            src={quest.thumbnail}
            alt={quest.title}
          />
          <div className="quest-description">
            {quest.description}
            <button
              onClick={() => handleButtonClick(quest)}
              className={`quest-button ${buttonClass}`}
            >
              {buttonText}
            </button>
          </div>
        </div>
        <div className={roundRowClass[index]}></div>
        <div className={bottomRowClass[index]}>
          <GiChest />
          <div className="sreward">{quest.reward}</div>
          <GiChest />
        </div>
      </div>
    );
  };

  return (
    <div className="featuredquests">
      {quests.map((quest, index) => renderQuest(quest, index))}
    </div>
  );
};

export default Featured;
