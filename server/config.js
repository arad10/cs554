module.exports = {
  twilio: {
    accountSid: "ACc6da1704670a1d1c2758af1d229b0db3",
    apiKey: "SKa7ab1a86b9bdeb999d3087e2d4aa4646",
    apiSecret: "PzebmYlpEUqeabdtOJMkXCaLP4rmiFH1",
    chatService: process.env.TWILIO_CHAT_SERVICE_SID,
    outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
    incomingAllow: process.env.TWILIO_ALLOW_INCOMING_CALLS === "true"
  }
};
