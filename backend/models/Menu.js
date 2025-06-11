const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  price: Number,
});

const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  items: [menuItemSchema],
});

module.exports = mongoose.model('Menu', menuSchema);
