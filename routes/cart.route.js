var express = require('express');
const controllers = require('../controllers/cart.controller');
var router = express.Router();

router.get('/add/:productId', controllers.addToCart);
router.get('/', controllers.get);
module.exports = router;