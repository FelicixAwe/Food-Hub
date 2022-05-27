require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
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
    const limitNumber = 10;
    const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumber);
    res.render('categories', {title: 'Food Hub - Recipe Categories', categoryById});
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

    const recipe = await Recipe.findById(recipeId);

    res.render('recipe', {title: 'Food Hub - Recipe', recipe});
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured"});
  }
}

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
//         "name": "Vegan Chinese noodles",
//         "description": `Jamie's vegan Chinese noodles recipe is super moreish;
//         thin rice noodles mixed with oriental mushrooms, garlic and chilli make a delicious vegan feast.
//
//
//         Source: https://www.jamieoliver.com/recipes/vegetables-recipes/vegan-chinese-noodles/`,
//         "ingredients":[
//           "200 g thin rice noodles",
//           "300 g mixed oriental mushrooms",
//           "such as oyster, shitake and enoki, cleaned",
//           "2 cloves of garlic",
//           "1 fresh red chilli",
//           "5 cm piece of ginger",
//           "200 g courgettes",
//           "½ bunch of fresh coriander",
//           "6 spring onions",
//           "groundnut oil , or vegetable oil",
//           "1 teaspoon cornflour",
//           "2 tablespoons low-salt soy sauce",
//           "1 tablespoon agave syrup",
//           "1 teaspoon seasame oil",
//           "½ tablespoon rice wine , or dry sherry",
//           "100 g baby spinach",
//           "2 limes , to serve",
//           "sambal , or hot chilli sauce, to serve"
//         ],
//         "category": "Chinese",
//         "image": "vegan-chinese-noodles.jpg",
//       }
//     ]);
//   } catch (error) {
//     console.log('err', + error);
//   } finally {
//
//   }
// }
//
// insertDymmyRecipeData();
