var express = require('express');
var router = express.Router();
const config = require('../config');
const { chatToken, videoToken, voiceToken } = require('../tokens');

const sendTokenResponse = (token, res) => {
    res.set('Content-Type', 'application/json');
    res.send(
      JSON.stringify({
        token: token.toJwt()
      })
    );
  };

  router.get('/', (req, res) => {
    res.json({message: "Route works!"})
  });
  
router.get('/chat/token', (req, res) => {
    const identity = req.query.identity;
    const token = chatToken(identity, config);
    sendTokenResponse(token, res);
});
  
router.post('/chat/token', (req, res) => {
    const identity = req.body.identity;
    const token = chatToken(identity, config);
    sendTokenResponse(token, res);
});
  
router.get('/video/token', (req, res) => {
    const identity = req.query.identity;
    const room = req.query.room;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
});
  
router.post('/video/token', (req, res) => {
    const identity = req.body.identity;
    const room = req.body.room;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
});
  
router.get('/voice/token', (req, res) => {
    const identity = req.body.identity;
    const token = voiceToken(identity, config);
    sendTokenResponse(token, res);
});
  
router.post('/voice/token', (req, res) => {
    const identity = req.body.identity;
    const token = voiceToken(identity, config);
    sendTokenResponse(token, res);
});

module.exports = router;