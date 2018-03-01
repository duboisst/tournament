var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/Joueur.js');

/* GET ALL JOUEURS */
router.get('/', function(req, res, next) {
  Joueur.find(function (err, joueurs) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE JOUEUR BY ID */
router.get('/:id', function(req, res, next) {
    Joueur.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE JOUEUR */
router.post('/', function(req, res, next) {
    Joueur.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE JOUEUR */
router.put('/:id', function(req, res, next) {
    Joueur.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE JOUEUR */
router.delete('/:id', function(req, res, next) {
    Joueur.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
