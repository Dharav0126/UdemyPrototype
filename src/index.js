require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const dbconfig = require("./config/dbconfig");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const authController = require("./controller/authController");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// view engine set up
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
console.log(process.env.PORT);

// connecting to the database
dbconfig();

// register end point
app.use("/auth/user", authRoutes);

// including static files to the server
app.use("/css", express.static(path.join(__dirname, "CSS")));
app.use("/IMG", express.static(path.join(__dirname, "IMG")));
app.use("/JS", express.static(path.join(__dirname, "JS")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// serving the ejs templates dynamycally
let pages = [
    "header",
    "footer",
  "about",
  "contact",
  "blog",
  "business",
  "courses",
  "dashboard",
  "design",
  "index",
  "it",
  "login",
  "marketing",
  "personal_development",
  "playlist",
  "profile",
  "register",
  "science",
  "software",
  "teacher_profile",
  "teachers",
  "template",
  "update",
  "view_blog",
  "watch_video",
  "web_development",
];

pages.forEach((pages) => {
  app.get(`/${pages}.ejs`, (req, res) => {
    res.render(`${pages}.ejs`);
  });
});

// starting the application on port in env file
app.listen(process.env.PORT, () => {
  console.log("server has started");
});
