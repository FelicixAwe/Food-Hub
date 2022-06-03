const mongoose = require('mongoose');
const Comment = require('./Comment');
const Like = require('./Like');

const recipeSchema = new mongoose.Schema({
  name:{
    type: String,
    required: 'This field is required.'
  },
  description:{
    type: String,
    required: 'This field is required.'
  },
  ingredients:{
    type: Array,
    required: 'This field is required.'
  },
  category:{
    type: String,
    enum: ['European', 'American', 'Chinese', 'Mexican', 'Indian', 'Korean', 'Japanese', 'Mediterranean', 'Vietnamese', 'Thai'],
    required: 'This field is required.'
  },
  image:{
    type: String,
    required: 'This field is required.'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  likes: 0
  // likes: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Like'
  //   }
  // ],
});


recipeSchema.index({ name: 'text', description: 'text'});
//Wildcard Indexing

module.exports = mongoose.model('Recipe', recipeSchema);
