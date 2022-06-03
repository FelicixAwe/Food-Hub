const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  Like:Number(0),
});

module.exports = mongoose.model('Like', likeSchema);
