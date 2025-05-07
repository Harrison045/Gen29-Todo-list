const bodyParser = require("body-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const UserRoute = require("./routes/UserRoute");
require("dotenv").config();

server = express();

server.use(bodyParser.json());

//routes
server.use(UserRoute);

mongoose.connect(process.env.MONGO_DB).then(() => {
  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
