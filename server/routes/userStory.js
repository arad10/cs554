var express = require('express');
const xss = require("xss");
var router = express.Router();
const userStoryAPI = require("../data").userStory;

/* Gets user story by id */
router.get("/:id", async (req, res) => {
    try{
        const userStoryObj = await userStoryAPI.getUserStory(xss(req.params.id));
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

  if (!xss(userStoryInfo.dashboardName)) {
    res.status(400).json({error: 'You must provide a dashboard name.'});
    return;
  }

  if (!xss(userStoryInfo.dashboardId)) {
    res.status(400).json({error: 'You must provide a dashboard id.'});
    return;
  }

  if (!xss(userStoryInfo.storyName)) {
    res.status(400).json({error: 'You must provide a story name.'});
    return;
  }

  if (!xss(userStoryInfo.storyPoints)) {
    res.status(400).json({error: 'You must provide story points.'});
    return;
  }

  if (!xss(userStoryInfo.description)) {
    res.status(400).json({error: 'You must provide a description.'});
    return;
  }

  if (!xss(userStoryInfo.postedDate)) {
    res.status(400).json({error: 'You must provide a posted date.'});
    return;
  }

  if (!xss(userStoryInfo.creator)) {
    res.status(400).json({error: 'You must provide a creator.'});
    return;
  }

  if (!xss(userStoryInfo.status)) {
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
    const userStory = await userStoryAPI.getUserStory(xss(req.params.id));
    let userStoryInfo = req.body;

    if (!userStoryInfo) {
      res.status(400).json({error: 'You must provide data to update a user story.'});
      return;
    }

    if (!xss(userStoryInfo.storyName) && !xss(userStoryInfo.storyPoints) && !xss(userStoryInfo.description) && !xss(userStoryInfo.status)) {
      res.status(400).json({error: 'You must provide at least the name or dashboards fields to update a user.'});
      return;
    }

    if (userStoryInfo.status === userStory.status) {
      res.status(200).json(userStory);
      return;
    }
    
    try{
      const updatedUserStory = await userStoryAPI.updateUserStory(xss(req.params.id), userStoryInfo);
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
        const userStory = await userStoryAPI.getUserStory(xss(req.params.id));
        try{
            let deletedUserStory = await userStoryAPI.deleteUserStory(xss(req.params.id));
            res.status(200).json(deletedUserStory);
        }catch(e){
            res.status(500).json({error:e});
        }
    }catch(e){
      res.status(404).json({message: "User story not found."});
    }
});

module.exports = router;
