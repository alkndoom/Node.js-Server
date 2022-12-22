if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}


const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const indexRouter = require('./routes/index');

const mongoDB = 'mongodb+srv://admin:<password>@cluster0.s0qgy2b.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(process.env.DATABASE_URL || mongoDB, {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layouts', '/layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(process.env.port || 3000);

