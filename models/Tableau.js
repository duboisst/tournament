var mongoose = require('mongoose');

var TableauSchema = new mongoose.Schema({
  tournoi_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournoi' },
  nom: String,
  description: String,
  cl_min:Number,
  cl_max:Number,
  numero_max:Number,
  categories:[],
  tous_sexes:[],
  date_heure_debut:Date,
  nb_max:Number,
  tarif:Number,
  tableaux_non_compatibles: [],
  updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tableau', TableauSchema);