"use strict";

const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController");

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.post("/", (req, res) => {// creating a new post route for hoome page
  console.log(req.body);
  console.log(req.query);// we are logging the boody request
  res.send("POST Successful!");
});

app.get("/items/:vegetable", homeController.sendReqParam);// handle request to /items/vegetables

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
