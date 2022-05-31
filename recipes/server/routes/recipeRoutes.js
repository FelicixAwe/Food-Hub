const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const passport = require('passport');
const passportLocal = require('passport-local');
const session = require('express-session');
/**
  * App Routes
*/
router.get('/', recipeController.homepage);
router.get('/recipe/:id', recipeController.exploreRecipe);
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesById);
//Comment
router.post('/recipe/:id/comments', recipeController.exploreRecipeComment);
//Register form
router.get('/register', recipeController.exploreRegister);
//Register a user to database
router.post('/register', recipeController.userRegister);
//Login form
router.get('/login', recipeController.exploreLogin);
//Login a user in the database
router.post('/login', recipeController.userLogin);
//logout route
router.get('/logout', recipeController.userLogout);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);

module.exports = router;
