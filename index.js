const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const staticRoutes = require('./routes/staticRoutes');
const authRoutes = require('./routes/authRoutes');
const flash = require('express-flash');
const session = require('express-session');

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
require('./passport-config');

// set view engine
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Port
const port = process.env.PORT || 3000;

// DB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(result => {
    app.listen(port);
    console.log('Server on port '+ port);
    console.log('Connected to DB');
  })
  .catch(err => console.log(err));

app.use((req, res, next) => {
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.user = req.user;
  next();
});

// Routes
app.use('/', staticRoutes);

app.use('/', authRoutes);

app.use((req, res) => {
  res.status(404).render('404');
});