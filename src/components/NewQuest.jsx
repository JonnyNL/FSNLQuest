class NewQuest {
  constructor(
    id,
    title,
    description,
    thumbnail,
    user,
    sDate,
    eDate,
    reward,
    userLimit
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.user = user;
    this.userLimit = userLimit;
    this.sDate = sDate;
    this.eDate = eDate;
    this.steps = [];
    this.reward = reward;
  }
}

export default NewQuest;
