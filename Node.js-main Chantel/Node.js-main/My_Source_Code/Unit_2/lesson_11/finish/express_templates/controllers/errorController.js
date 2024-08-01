"use strict";

const httpStatus = require("http-status-codes");// i am requiring the http Status

exports.logErrors = (error, req, res, next) => {// i added the middleware for error handling which will respond with the 404 status code
  console.error(error.stack);// i am logging the erro r stack
  next(error);// i am allowing the code to pass the error to the next middleware function
};

exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.send(`${errorCode} | The page doesn't exist!`);
  
};

exports.respondInternalError = (error, req, res, next) => {// this will catch all errors and respnd with 500 status code
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.sendFile(`./public/${errorCode}.html`, {// sends content in the  404.html
    root: "./"
});
};
