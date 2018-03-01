var mongoose = require('mongoose');

var TournoiSchema = new mongoose.Schema({
  nom: String,
  type: String,
  description: String,
  nb_tableaux_max_par_jour: [],
  updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tournoi', TournoiSchema);
