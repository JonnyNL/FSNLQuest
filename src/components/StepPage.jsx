import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const StepPage = () => {
  const [steps, setSteps] = useState([]);
  const { state } = useLocation();
  const { questId } = state;

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
      <h1>Quest Steps</h1>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step">
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepPage;
