var express = require('express');
const xss = require("xss");
var router = express.Router();
const userAPI = require("../data").user;

/* Gets user by id */
router.get("/:id", async (req, res) => {
    try{
        const userObj = await userAPI.getUser(xss(req.params.id));
        try{
            res.status(200).json(userObj);
        }catch(e){
            res.status(500).json({error:e});
        }
    }catch(e){
      res.status(404).json({message: "User not found."});
    }
  });

/* Creates a new user from the req.body details - id field is supplied by Firebase uid string */
router.post("/", async (req, res) => {
  let userInfo = req.body;

  if (!userInfo) {
    res.status(400).json({error: 'You must provide data to create a user.'});
    return;
  }

  if (!xss(userInfo.id)) {
    res.status(400).json({error: 'You must provide a user id from firebase.'});
    return;
  }

  if (!xss(userInfo.name)) {
    res.status(400).json({error: 'You must provide a user name.'});
    return;
  }

  try{
    const { id, name } = userInfo;
    const newUser = await userAPI.addUser(id, name);
    res.status(200).json(newUser);
  }catch(e){
    res.status(500).json({error:e});
  }
});

/* Updates the user with the supplied id */
router.patch("/:id", async (req, res) => {
  try{
    const user = await userAPI.getUser(xss(req.params.id));
    let userInfo = req.body;
    console.log(userInfo)
    if (!userInfo) {
      res.status(400).json({error: 'You must provide data to update a user.'});
      return;
    }

    if (!xss(userInfo.name) && !xss(userInfo.dashboards)) {
      res.status(400).json({error: 'You must provide at least the name or dashboards fields to update a user.'});
      return;
    }
    try{
            console.log("here")
      const updatedUser = await userAPI.updateUser(xss(req.params.id), userInfo);
      console.log("here")
      console.log(updatedUser)
      res.status(200).json(updatedUser);
    }catch(e){
      res.status(500).json({error:e});
    }

  }catch(e){
    res.status(404).json({message: "User not found."});
  }
});

module.exports = router;
