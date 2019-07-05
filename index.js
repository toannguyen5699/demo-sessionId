require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);


var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');

var authMiddleware = require('./validate/auth.middleware');
var sessionMiddleware = require('./validate/session.middleware')

var port = 2600;

var app =express();
app.set('view engine', 'pug');
app.set('views', './views');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index', {
		name: 'Toan'
	});
});

app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/products',productRoute);
app.use('/cart', cartRoute);


app.listen(port, function() {
	console.log('Server listening on port' + port);
})