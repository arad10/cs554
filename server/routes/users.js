var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.json({user: "user"});
});

module.exports = router;
