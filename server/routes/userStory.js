var express = require('express');
var router = express.Router();
const userStoryAPI = require("../data").userStory;

/* Gets user story by id */
router.get("/:id", async (req, res) => {
    try{
        const userStoryObj = await userStoryAPI.getUserStory(req.params.id);
        try{
            res.status(200).json(userStoryObj);
        }catch(e){
            res.status(500).json({error:e});
        }
    }catch(e){
      res.status(404).json({message: "User story not found."});
    }
  });

/* Creates a new user story from the req.body details */
router.post("/", async (req, res) => {
  let userStoryInfo = req.body;

  if (!userStoryInfo) {
    res.status(400).json({error: 'You must provide data to create a user story.'});
    return;
  }

  if (!userStoryInfo.dashboardName) {
    res.status(400).json({error: 'You must provide a dashboard name.'});
    return;
  }

  if (!userStoryInfo.dashboardId) {
    res.status(400).json({error: 'You must provide a dashboard id.'});
    return;
  }

  if (!userStoryInfo.storyName) {
    res.status(400).json({error: 'You must provide a story name.'});
    return;
  }

  if (!userStoryInfo.storyPoints) {
    res.status(400).json({error: 'You must provide story points.'});
    return;
  }

  if (!userStoryInfo.description) {
    res.status(400).json({error: 'You must provide a description.'});
    return;
  }

  if (!userStoryInfo.postedDate) {
    res.status(400).json({error: 'You must provide a posted date.'});
    return;
  }

  if (!userStoryInfo.creator) {
    res.status(400).json({error: 'You must provide a creator.'});
    return;
  }

  if (!userStoryInfo.status) {
    res.status(400).json({error: 'You must provide a status.'});
    return;
  }

  try{
    const { dashboardName, dashboardId, storyName, storyPoints, description, postedDate, creator, status } = userStoryInfo;
    const newUserStory = await userStoryAPI.addUserStory(dashboardName, dashboardId, storyName, storyPoints, description, postedDate, creator, status);
    res.status(200).json(newUserStory);
  }catch(e){
    res.status(500).json({error:e});
  }
});

/* Updates user story with the supplied id */
router.patch("/:id", async (req, res) => {
  try{
    const userStory = await userStoryAPI.getUserStory(req.params.id);
    let userStoryInfo = req.body;

    if (!userStoryInfo) {
      res.status(400).json({error: 'You must provide data to update a user story.'});
      return;
    }

    if (!userStoryInfo.storyName && !userStoryInfo.storyPoints && !userStoryInfo.description && !userStoryInfo.status) {
      res.status(400).json({error: 'You must provide at least the name or dashboards fields to update a user.'});
      return;
    }

    try{
      const updatedUserStory = await userStoryAPI.updateUserStory(req.params.id, userStoryInfo);
      res.status(200).json(updatedUserStory);
    }catch(e){
      res.status(500).json({error:e});
    }

  }catch(e){
    res.status(404).json({message: "User story not found."});
  }
});

/* Deletes user story with the supplied id */
router.delete("/:id", async (req, res) => {
    try{
        const userStory = await userStoryAPI.getUserStory(req.params.id);
        try{
            let deletedUserStory = await userStoryAPI.deleteUserStory(req.params.id);
            res.status(200).json(deletedUserStory);
        }catch(e){
            res.status(500).json({error:e});
        }
    }catch(e){
      res.status(404).json({message: "User story not found."});
    }
});

module.exports = router;
