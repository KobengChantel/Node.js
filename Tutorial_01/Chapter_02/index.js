
const express = require('express');
const app = express();
const path = require('path');
//o increase functionality with Express by adding a function to our application’smiddleware stack.
app.use(express.static(__dirname + "/public", {
    index: false, 
    immutable: true, 
    cacheControl: true,
    maxAge: "30d"
}));

app.listen(3000, () => {
    console.log("App listening on port 3000");
});
//we return json respond to the browser
app.get('/',(req,res)=>{ 
    res.json({
    name: 'Greg Lim'
    })
});
app.get('/', (req, res) => {
    //helps us get the full absolute path
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'contact.html'));
});