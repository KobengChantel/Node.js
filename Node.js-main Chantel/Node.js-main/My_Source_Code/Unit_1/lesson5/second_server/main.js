// const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes"),
//   app = http.createServer(),
//   getJSONString = obj => {
//     return JSON.stringify(obj, null, 2);
//   };

//   //Listen for requests.
//   app.on("request", (req, res) => {
//     var body = [];
//     req.on("data", (bodyData) => {
//     body.push(bodyData);
//     });
//     req.on("end", () => {
//     body = Buffer.concat(body).toString();
//     console.log(`Request Body Contents: ${body}`);
//     });
//     console.log(`Method: ${getJSONString(req.method)}`);
//     console.log(`URL: ${getJSONString(req.url)}`);
//     console.log(`Headers: ${getJSONString(req.headers)}`);
//     res.writeHead(httpStatus.OK, {
//       "Content-Type": "text/html"  //Respond with HTML.
//       });
//      // Prepare a response.
//       let responseMessage = "<h1>This will be shown on your screen.</h1>";
//       res.end(responseMessage);
//      });
//      app.listen(port);
//      console.log(`The server has started and is listening on port number:
//       ${port}`);

// LISTING 5.6 SIMPLE ROUTING

//Define mapping of routes with responses
const routeResponseMap = {
  "/": "<h1>Welcome!. How are you?</h1>",
  "/info": "<h1>Info Page</h1>",
  "/contact": "<h1>Contact Us</h1>",
  "/about": "<h1>Learn More About Us.</h1>",
  "/hello": "<h1>Say hello by emailing us here</h1>",
  "/error": "<h1>Sorry the page you are looking for is not here.</h1>"
 };
 const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer((req, res) => {
   // console.log("URL IS: ", reg)
  res.writeHead(200, {
 "Content-Type": "text/html"
  });

  //Check whether a request route is defined in the map.
  if (routeResponseMap[req.url]) {
 res.end(routeResponseMap[req.url]);
  } else {
    //Respond with default HTML
    res.end("<h1>Error!</h1>");
 }
 });
app.listen(port);
console.log(`The server has started and is listening on port number:
${port}`); 
