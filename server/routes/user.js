var express = require('express');
var router = express.Router();
const userAPI = require("../data").user;

/* Gets user by id */
router.get("/:id", async (req, res) => {
    try{
        const userObj = await userAPI.getUser(req.params.id);
        try{
            res.status(200).json(userObj);
        }catch(e){
            res.status(500).json({error:e});
        }
    }catch(e){
      res.status(404).json({message: "User not found."});
    }
  });

/* Creates a new user from the req.body details - Will eventually need an id field that is supplied by Firebase */
router.post("/", async (req, res) => {
  let userInfo = req.body;

  if (!userInfo) {
    res.status(400).json({error: 'You must provide data to create a user.'});
    return;
  }

  if (!userInfo.name) {
    res.status(400).json({error: 'You must provide a user name.'});
    return;
  }

  try{
    const { name } = userInfo;
    const newUser = await userAPI.addUser(name);
    res.status(200).json(newUser);
  }catch(e){
    res.status(500).json({error:e});
  }
});

/* Updates the user with the supplied id */
router.patch("/:id", async (req, res) => {
  try{
    const user = await userAPI.getUser(req.params.id);
    let userInfo = req.body;

    if (!userInfo) {
      res.status(400).json({error: 'You must provide data to update a user.'});
      return;
    }

    if (!userInfo.name && !userInfo.dashboards) {
      res.status(400).json({error: 'You must provide at least the name or dashboards fields to update a user.'});
      return;
    }

    try{
      const updatedUser = await userAPI.updateUser(req.params.id, userInfo);
      res.status(200).json(updatedUser);
    }catch(e){
      res.status(500).json({error:e});
    }

  }catch(e){
    res.status(404).json({message: "User not found."});
  }
});

module.exports = router;
