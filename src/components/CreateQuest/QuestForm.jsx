import React, { useState } from "react";

const QuestForm = ({ onThumbnailChange, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [enableDates, setEnableDates] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [steps, setSteps] = useState(["", "", ""]);
  const [reward, setReward] = useState("");
  const [userLimit, setUserLimit] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleStepChange = (index, value) => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[index] = value;
      return newSteps;
    });
  };

  const addStep = () => {
    if (steps.length < 5) {
      setSteps((prevSteps) => [...prevSteps, ""]);
    }
  };

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
      alert("Quest created successfully!");
    } else {
      // Handle any errors that occurred while posting the new quest
      alert("Failed to create the quest.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="file"
        id="thumbnail"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files[0])}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>

      <label htmlFor="userLimit">Users allowed to quest:</label>
      <input
        type="number"
        id="userLimit"
        min="1"
        value={userLimit}
        onChange={(e) => setUserLimit(e.target.value)}
        required
      />

      <label>
        <input
          type="checkbox"
          checked={enableDates}
          onChange={() => setEnableDates(!enableDates)}
        />
        Enable Dates
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
        <button type="button" onClick={addStep}>
          Add Step
        </button>
      )}

      <label htmlFor="reward">Reward:</label>
      <input
        type="text"
        id="reward"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestForm;
