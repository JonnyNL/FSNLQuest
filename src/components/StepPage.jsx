// Author: Jonathan Ivany 2023-04-16

// This component displays the steps for a selected quest

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <div className="step-page">
      <h1>
        Quest Steps: Future Implementation, adding solution will send to quest
        maker where they can review
      </h1>
      <div className="steps-container">
        {steps &&
          steps.map((step, index) => (
            <div key={index} className="step">
              {step}
            </div>
          ))}
      </div>
    </div>
  );
};

export default StepPage;
