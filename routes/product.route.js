var express = require('express')
const controllers = require('../controllers/product.controller');
var router = express.Router();
router.get('/', controllers.products);
    //router.get('/pagination/:pagination', controllers.pagination)
router.get('/:productId', controllers.get);
module.exports = router;