var mongoose = require('mongoose');

var JoueurSchema = new mongoose.Schema({
    licence:String,
    prenom:String,
    nom: String,
    sexe:String,
    club:String,
    points:Number,
    numero:Number,
    categorie:String,
    updated_date: { type: Date, default: Date.now }
  });

var TableauSchema = new mongoose.Schema({
    nom: String,
    description: String,
    cl_min:Number,
    cl_max:Number,
    numero_max:Number,
    categories:[String],
    sexes:[String],
    date_heure_debut:Date,
    nb_max:Number,
    tarif:Number,
    tableaux_non_compatibles: [],
    inscrits: [JoueurSchema],
    updated_date: { type: Date, default: Date.now }
  });
  
var TournoiSchema = new mongoose.Schema({
  nom: String,
  type: String,
  description: String,
  tableaux: [TableauSchema],
  nb_tableaux_max_par_jour: [],
  updated_date: { type: Date, default: Date.now }
});

var UserSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  fullname: String,
  email: String,
  gender: String,
  location: String,
  birthday: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Tournoi: mongoose.model('Tournoi', TournoiSchema),
  Joueur: mongoose.model('Joueur', JoueurSchema)
};
