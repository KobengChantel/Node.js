const http = require('http')//regiure function in node.js to help us grab the package in node.js
const fs = require('fs')
const homePage = fs.readFileSync('index.html')
const aboutPage = fs.readFileSync('about.html')
const contactPage = fs.readFileSync('contact.html')
const notFoundPage = fs.readFileSync('notfound.html')

const server = http.createServer((req, res) => {// we start and creat a server that takes in a function of 
  //read the content of each file and returns it
  if (req.url === '/about')
    res.end(aboutPage)
  else if (req.url === '/contact')
    res.end(contactPage)
  else if (req.url === '/')
    res.end(homePage)
  
  else {
    res.writeHead(404)
    res.end(notFoundPage)
  }
//   console.log(req.url)
// res.end('Hello Node.js')// our respond on the browser
})
server.listen(3000)//sever start taking reguests