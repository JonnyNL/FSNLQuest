import React, { useState } from "react";
import AvatarMale from "../site-images/AvatarMale.png";
import AvatarFemale from "../site-images/AvatarFemale.png";
import AvatarOther from "../site-images/AvatarOther.png";

function GenderSelect() {
  const [gender, setGender] = useState("other");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const getImageSrc = () => {
    if (gender === "male") {
      return AvatarMale;
    } else if (gender === "female") {
      return AvatarFemale;
    } else if (gender === "other") {
      return AvatarOther;
    } else {
      return "";
    }
  };

  return (
    <div className="gCenter">
      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="other"
            checked={gender === "other"}
            onChange={handleGenderChange}
          />
          Who Cares
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={handleGenderChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={handleGenderChange}
          />
          Female
        </label>
      </div>
      <div>
        <img
          src={getImageSrc()}
          height="75px"
          width="75px"
          alt="User Profile"
        />
      </div>
    </div>
  );
}

export default GenderSelect;
