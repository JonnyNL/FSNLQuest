import React from "react";
import HowTo from "../site-images/HowItWorks.png";
import "../footer.css";

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
