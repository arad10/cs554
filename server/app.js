var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const configRoutes = require('./routes');
const { AssignedAddOnExtensionInstance } = require('twilio/lib/rest/api/v2010/account/incomingPhoneNumber/assignedAddOn/assignedAddOnExtension');


var app = express();
var cors = require('cors')
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

configRoutes(app);

let server = app.listen(4000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:4000");
});

let io = require("socket.io")(server, {
  wsEngine: "ws",
  cors:{
    origin: "*"
  }
}).listen(server);

io.sockets.on("connection", (socket) => {
  let {roomID} = socket.handshake.query;
  socket.join(roomID);

  socket.on("chat_message", (msg) => { //msg has msg and username
    console.log("server got msg ", msg);
    io.in(roomID).emit("chat_message", msg); 
    //add to chathistory here
  });

  socket.on("disconnect", () => {
    socket.leave(roomID);
  });
});