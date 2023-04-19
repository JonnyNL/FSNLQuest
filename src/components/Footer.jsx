// Author: Jonathan Ivany
// The purpose of this component is to serve all the information a user may want to know before signing up, or infortmation to convince them to sign up
// FAQ and Our Mission is still to be added here, time constraints and lack of help didn't allow for this.

import React from "react";
import HowTo from "../site-images/HowItWorks.png";

const Footer = () => {
  return (
    <div>
      <footer>
        <img src={HowTo} alt="Site Instructions" />
      </footer>
    </div>
  );
};

export default Footer;
