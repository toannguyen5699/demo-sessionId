/*var mongoose = require('mongoose');

var productSchema  = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;*/

  
var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
    name: String,
    image: String,
    name: String,
    description: String
})
var Product = mongoose.model('Product', productSchema, 'products')
module.exports = Product;