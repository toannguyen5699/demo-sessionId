var shortid = require('shortid');
var db = require('../db');
var Session = require('../models/cart.model');


module.exports = function(req, res, next) {
    if (!req.signedCookies.sessionId) {
        var newsession = new Session({ cart: [] });
        newsession.save(function(err) {
            if (err) return handleError(err);
        });
        res.cookie('sessionId', newsession.id, {
            signed: true
        })
    }
    next();

}