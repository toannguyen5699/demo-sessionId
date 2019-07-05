var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    //cart: mongoose.Schema.Types.Mixed
    // cart: {
    //     productId: {
    //         soluong: Int32Array
    //     }
    // }
    cart: [{ _id: false, id: { type: String, ref: 'Product' }, count: Number }]
})
var Session = mongoose.model('Session', productSchema, 'sessions')

module.exports = Session;