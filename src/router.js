const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

// create a new instance of an Express.js router
const router = express.Router();    

// export the router so that it can be used in other files
module.exports = router;