const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const upload = require('../config/multer'); // Correct path to multer configuration

// Route to render the edit form
router.get('/edit/:id', async (req, res) => {
  if (req.isAuthenticated()) {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe && recipe.userId.equals(req.user.id)) {
      res.render('edit', { recipe });
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/login');
  }
});

// Route to handle the edit form submission
router.post('/edit/:id', upload.single('image'), async (req, res) => {
  if (req.isAuthenticated()) {
    const { title, ingredients, instructions } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    if (recipe && recipe.userId.equals(req.user.id)) {
      recipe.title = title;
      recipe.ingredients = ingredients;
      recipe.instructions = instructions;
      if (req.file) {
        recipe.image = req.file.path.replace('public/', '');
      }
      await recipe.save();
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/login');
  }
});

// Route to handle recipe deletion
router.post('/delete/:id', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (recipe && recipe.userId.equals(req.user.id)) {
        await Recipe.deleteOne({ _id: req.params.id });
        res.redirect('/');
      } else {
        res.redirect('/');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  } else {
    res.redirect('/login');
  }
});

// Route to render the new recipe form
router.get('/new', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('new');
  } else {
    res.redirect('/login');
  }
});

// Route to handle new recipe submission
router.post('/', upload.single('image'), async (req, res) => {
  if (req.isAuthenticated()) {
    const { title, ingredients, instructions } = req.body;
    const image = req.file ? req.file.path.replace('public/', '') : ''; // Ensure this path is correct
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      image,
      userId: req.user.id,
    });
    await newRecipe.save();
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
