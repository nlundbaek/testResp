"use strict";

// Dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var crypto = require("crypto");
var session = require("express-session");

// Database
mongoose.connect("mongodb://admin:12345@ds155087.mlab.com:55087/dip3semester");
var User = require("./schemes/user");
var Course = require("./schemes/course");
var Feedback = require("./schemes/feedback");

// App config
app.set("port", (process.env.PORT || 8080));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("combined"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(session({
    name: "NODESESSION",
    secret: "node.js rules",
    resave: false,
    saveUninitialized: false
}));

// Routes
var router = express.Router();
router.get("/favicon.ico", function(request, response){
    response.sendStatus(200);
});

require("./routes/getFrontpage")(router,User,Course,Feedback);
require("./routes/postLogin")(router, User, crypto);
require("./routes/getCreateUser")(router);
require("./routes/postCreate")(router, User, crypto);
require("./routes/getLogout")(router);
require("./routes/getProfile")(router, User, Course);
require("./routes/getCourse") (router, Course);
require("./routes/getRedigerProfil")(router,User);
require("./routes/postRedigerProfil")(router,User);
require("./routes/getCreateCourse")(router);
require("./routes/postCreateCourse")(router,Course);
require("./routes/getSearch")(router, Course);
require("./routes/getSpecificCourse")(router,Course);
require("./routes/postSpecificCourse")(router,User,Course);
require("./routes/getFindUser")(router,User);
require("./routes/postFindUser")(router, User);
require("./routes/postSpecificCourseFeedback")(router, Feedback, Course);
require("./routes/postSpecificFrameld")(router,User,Course);

app.use("/", router);
app.listen(app.get("port"), function() {
    console.log("Node js is running on port", app.get("port"));
});
