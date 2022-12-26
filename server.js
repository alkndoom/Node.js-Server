if (process.env.NODE_ENV !== 'production') {
    require('dotenv');
  }

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();

const indexRouter = require('./routes/indexRouter');
const authorsRouter = require('./routes/authorsRouter');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  limit: 'mb',
  extended: false,
}));

const mongoDB = 'mongodb+srv://admin:admin@cluster0.s0qgy2b.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL || mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((result) => console.log(`CONNECTED TO DATABASE: ${result}`))
.catch((err) => console.log(`AN ERROR OCCURRED: ${err}`));
/*const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));*/

app.listen(process.env.port || 3000);
app.use('/', indexRouter);
app.use('/authors', authorsRouter);
