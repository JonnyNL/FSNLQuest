// Author : Jonathan Ivany & Alex Gillespie

// The purpose of this component is to server as the create a quest page, the values feed from QuestForm.jsx are brought here to be added as a quest object, also rendering the page

import React, { useState } from "react";
import QuestForm from "./CreateQuest/QuestForm";
import "../backgrounds.css";
const CreateQuest = () => {
  const [thumbnail, setThumbnail] = useState(null);

  // function to handle setting the thumbnail image
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };
  // function that handles adding the new quest data as an object
  const handleSubmit = (newQuestData) => {
    // Post new quest data to the server
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("quest", JSON.stringify(newQuestData));

    fetch("http://localhost:5000/quests", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className="cBackground">
      <h1 className="cTitle">Create New Quest</h1>
      <QuestForm
        onThumbnailChange={handleThumbnailChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateQuest;
