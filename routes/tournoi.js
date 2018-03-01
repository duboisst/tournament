var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Tournoi = require('../models/Tournoi.js');
var Tableau = require('../models/Tableau.js');
var Joueur = require('../models/Joueur.js');

/* GET ALL TOURNOIS */
router.get('/', function(req, res, next) {
  Tournoi.find(function (err, tournois) {
    if (err) return next(err);
    res.json(tournois);
  });
});

router.get('/search', function(req, res, next) {
  Tournoi.find(function (err, tournois) {
    if (err) return next(err);
    res.json(tournois);
  });
});

/* create tournoi 1 */
router.get('/new1', function(req, res, next) {
    console.log('create new tournoi');
    t = new Tournoi({nom:"CAM Bordeaux 2019", type:"NB", description:"blabla", nb_tableaux_max_par_jour:[{jour: new Date("05/18/2019"), nb:2}]});
  Tournoi.create(t, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// create tournoi 2
router.get('/new2', function(req, res, next) {
    console.log('create new tournoi 2');
    t = new Tournoi({nom:"Cognac 2018", type:"I", description:"lorem ipsum ...", nb_tableaux_max_par_jour:[{jour: new Date("05/09/2018"), nb:2}, {jour: new Date("05/10/2018"), nb:3}, {jour: new Date("05/11/2018"), nb:1}, {jour: new Date("05/12/2018"), nb:3}, {jour: new Date("05/13/2018"), nb:2}]});
  Tournoi.create(t, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// create tableaux
router.get('/newtab', function(req, res, next) {
    console.log('create new tableaux');
    const toutes_categories = ['B1', 'B2', 'M1', 'M2', 'C1', 'C2', 'J1', 'J2', 'J3', 'S', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];
    const tous_sexes = ['M', 'F'];
    const max_classement = 10000;
    const min_classement = 500;
    const max_numero = 0;
    var tbx = [
    {tournoi_id:"5a980106fe6a2016989086be", nom:"Tableau A", description:"de 500 à 999 points", cl_min:min_classement, cl_max:999, numero_max:max_numero, categories:toutes_categories, sexe:tous_sexes, date_heure_debut:new Date("05/10/2018 10:00"), nb_max:48, tarif:6, tableaux_non_compatibles:[]},
    {tournoi_id:"5a980106fe6a2016989086be", nom:"Tableau B", description:"de 1300 à N°300", cl_min:1300, cl_max:max_classement, numero_max:300, categories:toutes_categories, sexe:tous_sexes, date_heure_debut:new Date("05/10/2018 11:00"), nb_max:48, tarif:8, tableaux_non_compatibles:[]},    
    {tournoi_id:"5a980106fe6a2016989086be", nom:"Tableau C", description:"de 500 à 1299", cl_min:min_classement, cl_max:1299, numero_max:max_numero, categories:toutes_categories, sexe:tous_sexes, date_heure_debut:new Date("05/10/2018 12:00"), nb_max:48, tarif:8, tableaux_non_compatibles:[]},
    {tournoi_id:"5a980106fe6a2016989086be", nom:"Tableau D", description:"de 500 à 1799", cl_min:min_classement, cl_max:1799, numero_max:max_numero, categories:toutes_categories, sexe:tous_sexes, date_heure_debut:new Date("05/10/2018 13:00"), nb_max:48, tarif:8, tableaux_non_compatibles:[]},
    {tournoi_id:"5a980106fe6a2016989086be", nom:"Tableau E", description:"de 500 à 1599", cl_min:min_classement, cl_max:1599, numero_max:max_numero, categories:toutes_categories, sexe:tous_sexes, date_heure_debut:new Date("05/10/2018 14:00"), nb_max:48, tarif:8, tableaux_non_compatibles:[]},
    {tournoi_id:"5a980106fe6a2016989086be", nom:"Tableau F", description:"de 500 à 1399", cl_min:min_classement, cl_max:1399, numero_max:max_numero, categories:toutes_categories, sexe:tous_sexes, date_heure_debut:new Date("05/10/2018 15:00"), nb_max:48, tarif:8, tableaux_non_compatibles:[]},
    {tournoi_id:"5a980106fe6a2016989086be", nom:"Tableau G", description:"Vétérans", cl_min:min_classement, cl_max:max_classement, numero_max:max_numero, categories:["V1", "V2", "V3", "V4", "V5", "V6"], sexe:tous_sexes, date_heure_debut:new Date("05/10/2018 16:00"), nb_max:48, tarif:7, tableaux_non_compatibles:[]},
    {tournoi_id:"5a980106fe6a2016989086be", nom:"Tableau L", description:"Toutes séries", cl_min:min_classement, cl_max:max_classement, numero_max:max_numero, categories:toutes_categories, sexe:tous_sexes, date_heure_debut:new Date("05/11/2018 15:00"), nb_max:96, tarif:10, tableaux_non_compatibles:[]},
    {tournoi_id:"5a980106fe6a2016989086be", nom:"Tableau I", description:"Poussins / Benjamins", cl_min:min_classement, cl_max:max_classement, numero_max:max_numero, categories:['P', 'B1', 'B2'], sexe:tous_sexes, date_heure_debut:new Date("05/10/2018 18:00"), nb_max:24, tarif:5, tableaux_non_compatibles:[]},
    {tournoi_id:"5a980106fe6a2016989086be", nom:"Tableau J", description:"Minimes / Cadets", cl_min:min_classement, cl_max:max_classement, numero_max:max_numero, categories:['P', 'B1', 'B2', 'M1', 'M2', 'C1', 'C2'], sexe:tous_sexes, date_heure_debut:new Date("05/10/2018 18:00"), nb_max:24, tarif:5, tableaux_non_compatibles:[]},
    {tournoi_id:"5a980106fe6a2016989086be", nom:"Tableau K", description:"Toutes séries dames", cl_min:min_classement, cl_max:max_classement, numero_max:max_numero, categories:toutes_categories, sexe:['F'], date_heure_debut:new Date("05/11/2018 14:00"), nb_max:96, tarif:8, tableaux_non_compatibles:[]},    
    {tournoi_id:"5a97fffcaabe6c3778c225e3", nom:"Tableau A", description:"de 500 à 1299 points", cl_min:min_classement, cl_max:1299, numero_max:max_numero, categories:toutes_categories, sexe:tous_sexes, date_heure_debut:new Date("05/18/2019 09:00"), nb_max:96, tarif:7, tableaux_non_compatibles:[]},
    {tournoi_id:"5a97fffcaabe6c3778c225e3", nom:"Tableau B", description:"de 500 à Non numéroté", cl_min:min_classement, cl_max:max_classement, numero_max:1001, categories:toutes_categories, sexe:tous_sexes, date_heure_debut:new Date("05/18/2019 10:00"), nb_max:6, tarif:7, tableaux_non_compatibles:[]},
    {tournoi_id:"5a97fffcaabe6c3778c225e3", nom:"Tableau C", description:"de 500 à 1599", cl_min:min_classement, cl_max:1599, numero_max:max_numero, categories:toutes_categories, sexe:tous_sexes, date_heure_debut:new Date("05/18/2019 11:00"), nb_max:6, tarif:7, tableaux_non_compatibles:[]}
    ];
    tbx.forEach(tb => {
        Tableau.create(tb, function (err, post) {
            if (err) return next(err);
          });
        }
    );
    res.json(tbx)
});

// create joueurs
router.get('/newjoueurs', function(req, res, next) {
  console.log('create new tableaux');
  var joueurs = [
    {licence:"3339022", prenom:"Stéphane", nom:"Dubois", sexe:"M", club:"CAM Bordeaux", points:940, numero:26547, categorie:"V1"},
    {licence:"3338295", prenom:"Arthur", nom:"Dubois", sexe:"M", club:"CAM Bordeaux", points:950, numero:24912, categorie:"B1"},
    {licence:"3338066", prenom:"Léo", nom:"Dubois", sexe:"M", club:"CAM Bordeaux", points:1384, numero:9009, categorie:"C2"},
    {licence:"3338173", prenom:"Cyril", nom:"Klein", sexe:"M", club:"CAM Bordeaux", points:1090, numero:20621, categorie:"V1"},
    {licence:"3338173", prenom:"Hugo", nom:"Klein", sexe:"M", club:"CAM Bordeaux", points:1867, numero:1726, categorie:"J2"},
    {licence:"3335924", prenom:"Thomas", nom:"Taillade", sexe:"M", club:"SA Mérignac", points:1527, numero:5344, categorie:"C2"},
    {licence:"3336028", prenom:"Pierre", nom:"Carrat", sexe:"M", club:"US Talence", points:1206, numero:14568, categorie:"C2"},
    {licence:"3332154", prenom:"Arnaud", nom:"Gireau", sexe:"M", club:"CAM Bordeaux", points:2193, numero:570, categorie:"J3"},
    {licence:"244431", prenom:"Sarah", nom:"Fonvielle", sexe:"F", club:"CAM Bordeaux", points:1719, numero:187, categorie:"S"},
];
joueurs.forEach(tb => {
    Joueur.create(tb, function (err, post) {
        if (err) return next(err);
      });
    }
);
res.json(joueurs)
});

/* GET ALL TABLEAUX */
router.get('/:id/tableaux', function(req, res, next) {
  Tableaux.find({'tournoi_id':req.params.id}, function (err, tableaux) {
    if (err) return next(err);
    res.json(tableaux);
  });
});


/* GET SINGLE TOURNOI BY ID */
router.get('/:id', function(req, res, next) {
  Tournoi.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', function(req, res, next) {
  Tournoi.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* UPDATE TOURNOI */
router.put('/:id', function(req, res, next) {
  Tournoi.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE TOURNOI */
router.delete('/:id', function(req, res, next) {
  Tournoi.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
