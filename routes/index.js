var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models/models.js');

// GET ALL TOURNOIS
router.get('/', function(req, res, next) {
    models.Tournoi.find({}, '_id nom type description updated_date nb_tableaux_max_par_jour', function (err, tournois) {
  // models.Tournoi.find({}, '_id nom type description updated_date nb_tableaux_max_par_jour', function (err, tournois) {
    if (err) return next(err);
    res.json(tournois);
  });
});

// SEARCH TOURNOIS
router.get('/search', function(req, res, next) {
  s = new RegExp('.*' + req.query.q + '.*', 'i');
  models.Tournoi.find({nom:s}, '_id nom type description updated_date nb_tableaux_max_par_jour', function (err, tournois) {
    if (err) return next(err);
    res.json(tournois);
  });
});

// GET SINGLE TOURNOI BY ID
router.get('/:id', function(req, res, next) {
    models.Tournoi.findById(req.params.id, function (err, tournoi) {
      if (err) return next(err);
      res.json(tournoi);
    });
  });
  

// CREATE NEW TOURNOI
router.post('/', function(req, res, next) {
  models.Tournoi.create(req.body, function (err, tournoi) {
    if (err) return next(err);
    res.json(tournoi);
  });
});


// UPDATE TOURNOI
router.put('/:id', function(req, res, next) {
  models.Tournoi.findByIdAndUpdate(req.params.id, req.body, function (err, tournoi) {
    if (err) return next(err);
    res.json(tournoi);
  });
});

// DELETE TOURNOI
router.delete('/:id', function(req, res, next) {
  models.Tournoi.findByIdAndRemove(req.params.id, req.body, function (err, tournoi) {
    if (err) return next(err);
    res.json(tournoi);
  });
});

// INSCRIPTION
router.put('/:id/inscription/:joueur', function(req, res, next) {
        models.Tournoi.findById(req.params.id, function (err, tournoi) {
            if (err) return next(err);
            
            // suppression du joueur dans tous les tableaux du tournoi
            tournoi.tableaux.forEach(t=>t.inscrits.pull(req.params.joueur));
            
            //ajout du joueur dans les tableaux choisis
            req.body.tableaux.forEach(t=> {
                let tab = tournoi.tableaux.id(t);
                tab.inscrits.push(req.params.joueur);
            });
            
            tournoi.save();
            res.json(tournoi);
        })
  });

module.exports = router;
