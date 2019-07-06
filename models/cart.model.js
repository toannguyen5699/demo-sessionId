var mongoose = require('mongoose');
var sessionSchema = new mongoose.Schema({
    //cart: mongoose.Schema.Types.Mixed
    // cart: {
    //     productId: {
    //         soluong: Int32Array
    //     }
    // }
    cart: [{ _id: false, id: { type: String, ref: 'Product' }, count: Number }]
})
var Session = mongoose.model('Session', sessionSchema, 'sessions')
module.exports = Session;