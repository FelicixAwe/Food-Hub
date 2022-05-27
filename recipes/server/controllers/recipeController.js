require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
/**
 * GET /
 * Homepage
*/
exports.homepage = async(req, res) => {

  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({_id:-1}).limit(limitNumber); //Latest recipes added to the database
    const chinese = await Recipe.find({'category': 'Chinese'}).limit(limitNumber);
    const american = await Recipe.find({'category': 'American'}).limit(limitNumber);
    const mexican = await Recipe.find({'category': 'Mexican'}).limit(limitNumber);
    const food = { latest, chinese, american, mexican };
    res.render('index', {title: 'Food Hub - Home', categories, food});
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured"});
  }
}


/**
 * GET /categories
 * Categories
*/
exports.exploreCategories = async(req, res) => {

  try {
    const limitNumber = 10;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', {title: 'Food Hub - Recipe Categories', categories});
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured"});
  }
}



/**
 * GET /categories/:id
 * Categories
*/
exports.exploreCategoriesById = async(req, res) => {

  try {
    let categoryId = req.params.id;
    let categoryName = req.params.name;
    const limitNumber = 10;
    const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumber);
    let categoryByName = await Recipe.find({'category': categoryName}).limit(limitNumber);
    res.render('categories', {title: 'Food Hub - Recipe Categories', categoryById, categoryByName});
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured"});
  }
}


/**
 * GET /recipe/:id
 * Recipe
*/
exports.exploreRecipe = async(req, res) => {

  try {
    let recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId).populate('comments');

    res.render('recipe', {title: 'Food Hub - Recipe', recipe});
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured"});
  }
}

/**
 * POST /recipe/:id/comment
 * Recipe Comment
*/


exports.exploreRecipeComment = async(req, res) => {
  const RecipeId = req.params.id;
  const newComment = new Comment({
    name:req.body.name,
    comment: req.body.comment
  });

  newComment.save((err, result) =>{
    if (err) {
      console.log(err);
    } else {
      Recipe.findById(req.params.id, (err, recipe) =>{
        if (err) {
          console.log(err);
        }
        else{
          recipe.comments.push(result);
          recipe.save();
          // console.log('=========comments==========')
          // console.log(recipe.comments);
          res.redirect('/');
        }
      })
    }
  });

}


/**
 * POST /search
 * Search
*/


exports.searchRecipe = async(req, res) => {


  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true}});
    res.render('search', {title: 'Food Hub - Search', recipe});

  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured"});
  }
}


/**
 * GET /explore-latest
 * Explore Latest
*/
exports.exploreLatest = async(req, res) => {

  try {
    const limitNumber = 10;
    const recipe = await Recipe.find({}).sort({__id: -1}).limit(limitNumber);
    res.render('explore-latest', {title: 'Food Hub - Explore Latest', recipe});
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured"});
  }
}




/**
 * GET /explore-random
 * Explore Random
*/
exports.exploreRandom = async(req, res) => {

  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render('explore-random', {title: 'Food Hub - Explore Random', recipe});
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured"});
  }
}


/**
 * GET /submit-recipe
 * Submit-Recipe
*/

exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', {title: 'Food Hub - Submit-Recipe', infoErrorsObj, infoSubmitObj});
}




/**
 * GET /submit-recipe
 * Submit-Recipe
*/

exports.submitRecipeOnPost = async(req, res) => {

  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length == 0){
      console.log('No File Uploaded.');
    }
    else{
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if (err) return res.status(500).send(err);
      })


    }


    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image:newImageName
    });

    await newRecipe.save();


    req.flash('infoSubmit', 'Recipe has been added.');
    res.redirect('/submit-recipe');
  } catch (error) {
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }

}


// Delete Recipe
// async function deleteRecipe(){
//   try {
//     await Recipe.deleteOne({ name: 'New Recipe From Form' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteRecipe();

// async function updateRecipe(){
//
//   try {
//     const res = await Recipe.updateOne({name: 'New Recipe'}, {name: 'New Recipe Updated'});
//     res.n; //Number of documents matched
//     res.nModified; //Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
//
// updateRecipe();


// async function insertDymmyCategoryData(){
//
//   try {
//     await Category.insertMany([
//       {
//         "name": "American",
//         "image": "american-food.jpg"
//       },
//       {
//         "name": "Chinese",
//         "image": "chinese-food.jpg"
//       },
//       {
//         "name": "Mexican",
//         "image": "mexican-food.jpg"
//       },
//       {
//         "name": "Indian",
//         "image": "indian-food.jpg"
//       },
//       {
//         "name": "European",
//         "image": "european-food.jpg"
//       },
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }
//
// insertDymmyCategoryData();


// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       {
//       	"name": "Apple Pie",
//       	"description": `Source: https://www.allrecipes.com/recipe/12682/apple-pie-by-grandma-ople/
//       Image Source: https://commons.wikimedia.org/wiki/File:Apple_pie.jpg
//
//       1. Preheat oven to 425 degrees F (220 degrees C). Melt the butter in a saucepan. Stir in flour to form a paste. Add water, white sugar and brown sugar, and bring to a boil. Reduce temperature and let simmer.
//       2. Place the bottom crust in your pan. Fill with apples, mounded slightly. Cover with a lattice work crust. Gently pour the sugar and butter liquid over the crust. Pour slowly so that it does not run off.
//       3. Bake 15 minutes in the preheated oven. Reduce the temperature to 350 degrees F (175 degrees C). Continue baking for 35 to 45 minutes, until apples are soft.``,
//
//       	"ingredients":[
//       		"1 recipe pastry for a 9 inch double crust pie",
//       		"½ cup unsalted butter",
//       		"3 tablespoons all-purpose flour",
//       		"¼ cup water",
//       		"½ cup white sugar",
//       		"½ cup packed brown sugar",
//       		"8 Granny Smith apples - peeled, cored and sliced" ],
//
//       	"category": "American",
//       	"image": "apple-pie.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log('err', + error);
//   } finally {
//
//   }
// };
// insertDymmyRecipeData();
