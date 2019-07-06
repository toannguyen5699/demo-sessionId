const db = require('../db');
const Session = require('../models/cart.model');
const Product = require('../models/product.model');
const productController = require('../controllers/product.controller');
module.exports = {
    addToCart: async(req, res, next) => {
        var productId = req.params.productId;

        var sessionId = req.signedCookies.sessionId;
        var session = await Session.find({ _id: sessionId })
        if (!sessionId) {
            res.redirect('/products');
            return;
        }
        var arrcart = session[0].cart
        var bool = false;
        var count = 0;
        var cartsl = 0;
        if (arrcart) {
            for (var i = 0; i < arrcart.length; i++) {
                if (arrcart[i].id === productId) {
                    count = arrcart[i].count + 1
                    Session.updateMany({ _id: sessionId, "cart.id": productId }, { $set: { "cart.$.count": count } },
                        function(error, success) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(success);
                            }
                        })
                    bool = true;
                }
                cartsl = cartsl + arrcart[i].count;
            }
        }

        if (bool === false) {
            Session.findOneAndUpdate({ _id: sessionId }, {
                    $addToSet: {
                        cart: { id: productId, count: 1 }
                    }
                },
                function(error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                }
            )
        }

        res.redirect(req.headers.referer)
    },
    get: async(req, res) => {
        var sessionId = req.signedCookies.sessionId;
        var session = await Session.find({ _id: sessionId })
        var arrcart = session[0].cart
        var product = await Product.find()
        var arr = [];
        for (let i = 0; i < arrcart.length; i++) {
            //console.log(arrcart[i].id)
            for (let j = 0; j < product.length; j++) {
                if (arrcart[i].id === product[j].id) {
                    console.log(product[j].id)
                    arr.push({ image: product[j].image, name: product[j].name, description: product[j].description, count: arrcart[i].count })
                }
            }
        }

        var product = await Product.find({ _id: arrcart[0].id })
            // populate('_id').
            // exec(function(err, Product) {
            //     if (err) return handleError(err);
            //     console.log('The author is %s', Product.name);
            //     // prints "The author is Ian Fleming"
            // });
            // var a = await Session.findOne({ _id: '5cf2ad80204e202fbc09bcf8' }).populate('cart').exec(function(err, story) {
            //     if (err) return handleError(err);
            //     console.log(story);
            // });
        res.render('cart/cart', {
            arrcart: arr
        })
    }
}