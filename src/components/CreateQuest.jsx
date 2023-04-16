import React, { useState } from "react";
import NewQuest from "./NewQuest"; // Import the NewQuest class
import QuestForm from "./CreateQuest/QuestForm"; // Import the QuestForm component (I'll provide the code below)

const CreateQuest = () => {
  const [thumbnail, setThumbnail] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

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
      <h1>Create New Quest</h1>
      <QuestForm
        onThumbnailChange={handleThumbnailChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateQuest;
