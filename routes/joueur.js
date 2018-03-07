var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models/models.js');

/* GET ALL JOUEURS */
router.get('/', function(req, res, next) {
  models.Joueur.find(function (err, joueurs) {
    if (err) return next(err);
    res.json(joueurs);
  });
});

/* GET SINGLE JOUEUR BY ID */
router.get('/:id', function(req, res, next) {
  models.Joueur.findById(req.params.id, function (err, joueur) {
    if (err) return next(err);
    res.json(joueur);
  });
});

/* SAVE JOUEUR */
router.post('/', function(req, res, next) {
  models.Joueur.create(req.body, function (err, joueur) {
    if (err) return next(err);
    res.json(joueur);
  });
});

/* UPDATE JOUEUR */
router.put('/:id', function(req, res, next) {
  models.Joueur.findByIdAndUpdate(req.params.id, req.body, function (err, joueur) {
    if (err) return next(err);
    res.json(joueur);
  });
});

/* DELETE JOUEUR */
router.delete('/:id', function(req, res, next) {
  models.Joueur.findByIdAndRemove(req.params.id, req.body, function (err, joueur) {
    if (err) return next(err);
    res.json(joueur);
  });
});

module.exports = router;
