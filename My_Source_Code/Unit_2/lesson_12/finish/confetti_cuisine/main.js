"use strict";

const express = require("express"),// i am requiring the express
  app = express(),// and initiating the express appliction
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);// iam setting the prot to 3000
app.use(
  express.urlencoded({// setting the  express.js app to use body parser for processing the url encoded and json parameters
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
//add routes for contact page, courses page, and contact form submission
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

// add middleware function to handle errors
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {// we are setting the port to lsten to prot
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
