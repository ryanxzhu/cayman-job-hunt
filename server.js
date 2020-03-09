if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-layouts');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const jobRouter = require('./routes/jobs');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', function(error) {
	console.log(error);
});
db.on('open', function() {
	console.log('Connected to Mongoose');
});

app.use('/', indexRouter);
app.use('/jobs', jobRouter);

app.listen(process.env.PORT || 3000);
