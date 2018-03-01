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

module.exports = mongoose.model('Joueur', JoueurSchema);
