//before allowing a user to create a blog post we check their session id
module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render('create');
    }
    //check if their session contains user id
    //if not we redirect back tolog in page
    res.redirect('/auth/login');
}