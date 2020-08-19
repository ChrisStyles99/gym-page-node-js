const express = require('express');
const router = express.Router();

const Message = require('../models/Message');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/contact-us', (req, res) => {
  res.render('contact-us');
});

router.post('/contact-us', (req, res) => {
  const {name, email, message} = req.body;
  const contactMessage = new Message({name, email, message});

  contactMessage.save()
    .then(result => {
      res.redirect('/contact-success');
    })
    .catch(err => console.log(err));
});

router.get('/contact-success', (req, res) => {
  res.render('contact-success');
});

router.get('/gallery', (req, res) => {
  res.render('gallery');
});

module.exports = router;