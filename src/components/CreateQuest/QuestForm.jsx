// Importing the useState hook and the useNavigate hook from the react-router-dom package
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../QuestForm.css";

// Defining the QuestForm component and passing in some props
const QuestForm = ({ onThumbnailChange, onSubmit }) => {
  // Using the useState hook to manage state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [enableDates, setEnableDates] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [steps, setSteps] = useState(["", "", ""]);
  const [reward, setReward] = useState("");
  const [userLimit, setUserLimit] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  // Using the useNavigate hook to get access to the navigate function
  const navigate = useNavigate();

  // Function to handle changes to the steps array
  const handleStepChange = (index, value) => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[index] = value;
      return newSteps;
    });
  };

  // Function to add a new step to the steps array
  const addStep = () => {
    if (steps.length < 5) {
      setSteps((prevSteps) => [...prevSteps, ""]);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch the current user's data from the JSON server
    const response = await fetch(`http://localhost:5000/currentUser`);
    const currentUser = await response.json();

    const newQuestData = {
      title,
      description,
      thumbnail,
      user: currentUser.userName,
      userLimit,
      startDate: enableDates ? startDate : null,
      endDate: enableDates ? endDate : null,
      steps,
      reward,
    };

    // Post the new quest data to the JSON server
    const postResponse = await fetch("http://localhost:5000/quests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestData),
    });

    if (postResponse.ok) {
      // Successfully posted the new quest
      const createdQuest = await postResponse.json();

      // Update currentUser.questscreated array
      currentUser.questscreated.push(createdQuest.id);
      await fetch(`http://localhost:5000/currentUser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      });

      // Update logged-in user's questscreated array in users
      const userResponse = await fetch(
        `http://localhost:5000/users/${currentUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ questscreated: currentUser.questscreated }),
        }
      );

      if (userResponse.ok) {
        alert(
          "Quest created successfully! **Note: The added thumbnail won't appear due to current skill issues, will be future update :)**"
        );
        navigate("/landing");
      } else {
        alert("Failed to update the user's questscreated.");
      }
    } else {
      // Handle any errors that occurred while posting the new quest
      alert("Failed to create the quest.");
    }
  };

  // Rendering the create quest form

  return (
    <form onSubmit={handleSubmit}>
      <div className="questForm-container">
        <div className="questForm-left">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div
            className="thumbnail-container"
            onClick={() => document.getElementById("thumbnail").click()}
          >
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              className="thumbnail-input"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
            <span className="camera-icon" role="img" aria-label="camera">
              📷
            </span>
          </div>

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="questForm-right">
          <label className="enable-dates-label">
            Enable Dates
            <input
              type="checkbox"
              className="round-checkbox"
              checked={enableDates}
              onChange={() => setEnableDates(!enableDates)}
            />
          </label>

          {enableDates && (
            <>
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />

              <label htmlFor="endDate">End Date (Optional):</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </>
          )}

          <label htmlFor="userLimit">Users allowed to quest:</label>
          <input
            type="number"
            id="userLimit"
            min="1"
            value={userLimit}
            onChange={(e) => setUserLimit(e.target.value)}
            required
          />

          {steps.map((step, index) => (
            <div key={index}>
              <label htmlFor={`step${index + 1}`}>Step {index + 1}:</label>
              <input
                type="text"
                id={`step${index + 1}`}
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                required
              />
            </div>
          ))}

          {steps.length < 5 && (
            <button type="button" onClick={addStep} className="add-step-button">
              Add Step
            </button>
          )}

          <label htmlFor="reward">Reward</label>
          <input
            type="text"
            id="reward"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="buttons-container">
        <button type="submit" className="submit-button">
          Submit
        </button>
        <button className="exit-button" onClick={() => navigate("/landing")}>
          Exit
        </button>
      </div>
    </form>
  );
};

export default QuestForm;
