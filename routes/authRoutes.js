const express = require('express');
const passport = require('passport');

const router = express.Router();

// Routes
router.get('/register', isNotAuthenticated, (req, res) => {
  res.render('register');
});

router.post('/register', passport.authenticate('local', {
  successRedirect: '/login',
  failureRedirect: '/register',
  passReqToCallback: true
}));

router.get('/login', isNotAuthenticated, (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
  req.logOut();
  res.redirect('/');
});

router.get('/pricing', isAuthenticated, (req, res) => {
  res.render('pricing');
});

router.get('/profile', isAuthenticated, (req, res) => {
  res.render('profile');
});

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

function isNotAuthenticated(req, res, next) {
  if(!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/profile');
};

module.exports = router;