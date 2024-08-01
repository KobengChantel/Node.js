const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const { username, password } = req.body;
    User.findOne({username: username}, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) { // if passwords match
                    console.log(user);
                    //assign the user_id to the session
                    //session package save the data on the user beowser
                    //each time the user makes the the request
                    //a cookie is sent to back to the server with an authentication id
                    //from this we wil know if a user is logged in
                    req.session.userId = user._id;
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                }
            });
        } else {
            res.redirect('/auth/login');
        }
    });
};