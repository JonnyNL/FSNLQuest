import React, { useState, useEffect } from "react";
import Avatar from "../../site-images/AvatarMale.png";
import { GiChest } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const [quests, setQuests] = useState([]);
  const [buttonText, setButtonText] = useState("Accept Quest");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuests = async () => {
      const response = await fetch("http://localhost:5000/quests");
      const data = await response.json();
      setQuests(selectRandomQuests(data, 3));
    };

    fetchQuests();

    const interval = setInterval(() => {
      setQuests((prevQuests) => rotateArray(prevQuests, 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const selectRandomQuests = (quests, n) => {
    const shuffled = quests.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const rotateArray = (arr, count) => {
    return [...arr.slice(count), ...arr.slice(0, count)];
  };

  const renderQuest = (quest, index) => {
    const topRowClass = ["topleftrow", "topmiddlerow", "toprightrow"];
    const roundRowClass = ["roundleftrow", "roundmiddlerow", "roundrightrow"];
    const bottomRowClass = [
      "bottomleftrow",
      "bottommiddlerow",
      "bottomrightrow",
    ];
    const questClass = ["leftquest", "middlequest", "rightquest"];

    const handleButtonClick = () => {
      if (buttonText === "Accept Quest") {
        setButtonText("View Steps");
      } else if (buttonText === "View Steps") {
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
            <button onClick={handleButtonClick} className="quest-button">
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
