"use strict";

exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};

exports.respondWithName = (req, res) => {
  let paramsName = req.params.myName;// we are assigning the variable with the name
  res.render("index", { theName: paramsName });//we pass the variable to a rendered(provide,give,supply,offer) view
 // res.render("index");
};
