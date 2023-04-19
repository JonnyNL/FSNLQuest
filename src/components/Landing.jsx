// Author: Jonathan Ivany

// The purpose of this component is to render the landing page for NLQUEST
// Consisting of a navbar, featured section, upcoming quest section, and a user made quest section

import React from "react";
import NavBar from "../components/NavBar";
import Featured from "./landing/Featured";
import Upcoming from "./landing/Upcoming";
import UserMade from "./landing/UserMade";
import "./featuredstyle.css";
import "./upcomingstyle.css";
import "./usermadestyle.css";

const Landing = () => {
  return (
    <div className="lbackground">
      <div className=""></div>
      <NavBar />
      <div className="centerL">
        <h1 className="lTitle">FEATURED QUESTS</h1>
        <br />
        <Featured />
        <h1 className="lTitle">UPCOMING QUESTS</h1>
        <br />
        <Upcoming />
        <h1 className="lTitle">USER MADE QUESTS</h1>
        <br />
        <UserMade />
      </div>
    </div>
  );
};

export default Landing;
