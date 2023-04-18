import React, { useEffect, useState } from "react";

const Upcoming = () => {
  const [upcomingQuests, setUpcomingQuests] = useState([]);

  // Fetches the upcoming quests from the JSON server and sets the state with the filtered and sorted data
  useEffect(() => {
    const fetchUpcomingQuests = async () => {
      const response = await fetch("http://localhost:5000/quests");
      const data = await response.json();
      const today = new Date();

      const filteredQuests = data
        .filter((quest) => new Date(quest.sDate) > today) // Filter quests with sDate greater than today
        .sort((a, b) => new Date(a.sDate) - new Date(b.sDate)) // Sort by sDate in ascending order
        .slice(0, 2); // Select only the first two upcoming quests

      setUpcomingQuests(filteredQuests);
    };

    fetchUpcomingQuests();
  }, []);

  // Renders the upcoming quests using divs with background images and date information
  return (
    <div>
      <div class="upcomingquests">
        {upcomingQuests.map((quest, index) => (
          <div
            class={index === 0 ? "leftupcoming" : "rightupcoming"} // Alternate the placement of the quests using the index
            style={{
              backgroundImage: `url(${quest.thumbnail})`, // Set the background image to the quest's thumbnail
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div class={index === 0 ? "lefttoprow" : "righttoprow"}>
              {quest.sDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
