// Author: Jonathan Ivany

// This is the user contructor which creates a new user object that I add to db.json

class NewUser {
  constructor(userName, passWord, fName, lName, areaCode, gender, profileIMG) {
    this.userName = userName;
    this.passWord = passWord;
    this.fName = fName;
    this.lName = lName;
    this.areaCode = areaCode;
    this.gender = gender;
    this.profileIMG = profileIMG;
    this.questscompleted = 0;
    this.questscreated = [];
    this.rewards = [];
    this.acceptedQuests = [];
  }
}

export default NewUser;
