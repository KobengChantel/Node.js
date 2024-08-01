const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// Home route
router.get('/', async (req, res) => {
  if (req.isAuthenticated()) {
    const recipes = await Recipe.find({ userId: req.user.id });
    res.render('index', { recipes, user: req.user });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
