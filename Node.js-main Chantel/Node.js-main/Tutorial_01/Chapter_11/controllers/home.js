const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({});
    //in hoeme page, when log in the will be a session tha has a cookie data with userId
    //userid will be shared with the server and the browser
    //in each request we will know if a user is logged in or not
    console.log(req.session);
    res.render('index', {
        blogposts
    });
}