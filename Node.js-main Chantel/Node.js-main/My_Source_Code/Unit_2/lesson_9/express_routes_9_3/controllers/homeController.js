"use strict";

exports.sendReqParam = (req, res) => { //creating afuunction to handle route-specific requests
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};
