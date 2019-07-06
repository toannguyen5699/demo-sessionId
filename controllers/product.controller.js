var Product = require('../models/product.model');
var Session = require('../models/cart.model');
module.exports = {
    products: async(req, res, next) => {
        var page = parseInt(req.query.page) || 1;
        var sumPage = 0;
        if (page > 3) {
            sumPage = 4
        } else {
            sumPage = 1
        }
        var sessionId = req.signedCookies.sessionId;
        var products = await Product.find().limit(4).skip(4 * (page - 1));
        var next = page + 1;
        var previous = page - 1;
        var sessions = await Session.find({ _id: sessionId });
        if (sessionId) {
            var arrcart = sessions[0].cart
            var cartsl = 0;
            for (var i = 0; i < arrcart.length; i++) {
                cartsl = cartsl + arrcart[i].count;
            }
        }
        res.render('products/products', {
            products: products,
            cartsl,
            sumPage,
            next,
            previous 
        });
    },
    get: async(req, res) => {
            var sessionId = req.signedCookies.sessionId;
            var session = await Session.find({ _id: sessionId });
            if (sessionId) {
                var arrcart = session[0].cart
                var cartsl = 0;
                for (var i = 0; i < arrcart.length; i++) {
                    cartsl = cartsl + arrcart[i].count;
                }
            }
            var productId = req.params.productId
            var product = await Product.find({ _id: productId })
            res.render('products/index', {
                product: product[0],
                cartsl
            })
        }
        //,
        // pagination: async(req, res) => {
        //     var value = parseInt(req.params.pagination)
        //     var sesstionId = req.signedCookies.sesstionId;
        //     var products = await Product.find().limit(3).skip(3 * (value - 1))
        //     var session = await Session.find({ _id: sesstionId });
        //     if (sesstionId) {
        //         var arrcart = session[0].cart
        //         var cartsl = 0;
        //         for (var i = 0; i < arrcart.length; i++) {
        //             cartsl = cartsl + arrcart[i].count;
        //         }
        //     }
        //     res.render('products/products.pug', {
        //         products: products,
        //         cartsl
        //     });
        // }

}
