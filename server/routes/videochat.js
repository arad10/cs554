var express = require('express');
const xss = require("xss");
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
  
router.get('/chat/token', (req, res) => {
    const identity = xss(req.query.identity);
    const token = chatToken(identity, config);
    sendTokenResponse(token, res);
});
  
router.post('/chat/token', (req, res) => {
    const identity = xss(req.body.identity);
    const token = chatToken(identity, config);
    sendTokenResponse(token, res);
});
  
router.get('/video/token', (req, res) => {
    const identity = xss(req.query.identity);
    const room = xss(req.query.room);
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
});
  
router.post('/video/token', (req, res) => {
    const identity = xss(req.body.identity);
    const room = xss(req.body.room);
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
});
  
router.get('/voice/token', (req, res) => {
    const identity = xss(req.body.identity);
    const token = voiceToken(identity, config);
    sendTokenResponse(token, res);
});
  
router.post('/voice/token', (req, res) => {
    const identity = xss(req.body.identity);
    const token = voiceToken(identity, config);
    sendTokenResponse(token, res);
});

module.exports = router;