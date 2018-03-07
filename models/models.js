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
    inscrits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Joueur' }],
    updated_date: { type: Date, default: Date.now }
  });
  TableauSchema.virtual('estComplet').get(function() {
    return this.inscrits.length == this.nb_max;
  });
  TableauSchema.virtual('date_debut').get(function() {
    return new Date(this.date_heure_debut.getFullYear(), this.date_heure_debut.getMonth(), this.date_heure_debut.getDate());
  });
  TableauSchema.set('toJSON', {
    virtuals: true
  });
  
var TournoiSchema = new mongoose.Schema({
  nom: String,
  type: String,
  description: String,
  tableaux: [TableauSchema],
  nb_tableaux: Number,
  nb_tableaux_max_par_jour: [],
  updated_date: { type: Date, default: Date.now }
});
TournoiSchema.pre('save', function (next) {
  console.log('in pre save');
  updateNbTableaux(this);
  next();
});

TournoiSchema.pre('findOneAndUpdate', function(next) {
  console.log('in pre findOneAndUpdate');
  updateNbTableaux(this.getUpdate());
  next();
});

function updateNbTableaux(tournoi) {
  try {
    tournoi.nb_tableaux = tournoi.tableaux.length;
  }
  catch (e) {
    tournoi.nb_tableaux = 0;
  }
}

TournoiSchema.virtual('date_debut').get(function () {
  var dates = this.nb_tableaux_max_par_jour.map(element => element.jour).sort(function(d1, d2) {
    if (d1 > d2) return 1;
    if (d1 < d2) return -1;
    return 0;
  });
  return dates[0];
});
TournoiSchema.virtual('date_fin').get(function() {
  var dates = this.nb_tableaux_max_par_jour.map(element => element.jour).sort(function(d1, d2) {
      if (d1 > d2) return -1;
      if (d1 < d2) return 1;
      return 0;
  });
  return dates[0];
});
TournoiSchema.virtual('nom_type').get(function() {
  switch (this.type) {
      case 'I': {
          return "International";
      }
      case 'NA': {
          return "National A";
      }
      case 'NB': {
          return "National B";
      }
      case 'R': {
          return "Régional";
      }
      case 'D': {
          return "Départemental";
      }
      default: {
          return "";
      }
  } 
});
TournoiSchema.set('toJSON', {
  virtuals: true
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
