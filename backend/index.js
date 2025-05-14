const bodyParser = require("body-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const UserRoute = require("./routes/UserRoute");
require("dotenv").config();
const cors = require("cors");

server = express();

server.use(bodyParser.json());
server.use(cors());

//routes
server.use(UserRoute);

mongoose.connect(process.env.MONGO_DB).then(() => {
  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
