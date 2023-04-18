// Author: Jonathan Ivany 2023-04-16

// This component displays the steps for a selected quest

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./StepPage.css";
import backgroundVid from "../site-images/BackgroundVtest.mp4";

const StepPage = () => {
  // Set state variables for the quest steps and the selected quest id
  const [steps, setSteps] = useState([]);
  const { state } = useLocation();
  const { questId } = state;
  // Use the 'useNavigate' hook to enable navigation between pages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuest = async () => {
      const response = await fetch(`http://localhost:5000/quests/${questId}`);
      const data = await response.json();
      setSteps(data.steps);
    };

    fetchQuest();
  }, [questId]);

  return (
    <div className="stPstep-page">
      <div className="video-background">
        <video src={backgroundVid} autoPlay muted loop playsInline></video>
      </div>
      <h1 className="Explain">
        Quest Steps: Future Implementation, adding solution will send to quest
        maker where they can review
      </h1>
      <div className="stPsteps-container">
        {steps &&
          steps.map((step, index) => (
            <div key={index} className="stPstep">
              {step}
            </div>
          ))}
      </div>
      <div className="stPbutton-container">
        <button className="stPback-button" onClick={() => navigate("/landing")}>
          Back To Quests
        </button>
      </div>
    </div>
  );
};

export default StepPage;
