const express = require("express");
const { signUp, signIn, signOut } = require("../controller/UserController");
const router = express.Router();

router.post("/api/signup", signUp);
router.post("/api/signin", signIn); // Assuming you have a signIn function in UserController
router.post("/api/signout", signOut); // Assuming you have a signOut function in UserController

module.exports = router;
// This code defines an Express router for handling user sign-up requests. It imports the necessary modules, including the express library and the signUp function from the UserController. The router is set up to handle POST requests to the "/api/signup" endpoint, which triggers the signUp function when a request is made. Finally, the router is exported for use in other parts of the application.
