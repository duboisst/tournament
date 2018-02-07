import {Tableau} from './tableau';

export class Tournoi {
    _id: number;
    nom: string;
    date_debut: Date;
    date_fin: Date;
    type: string;
    nom_type: string;
    description: string;

    constructor(_id, nom, date_debut, date_fin, type, description) {
        this._id = _id; this.nom = nom, this.date_debut = date_debut; this.date_fin = date_fin; this.type = type; this.description = description;
        switch (this.type) {
            case 'I': {
                this.nom_type = "International";
                break;
            }
            case 'NA': {
                this.nom_type = "National A";
                break;
            }
            case 'NB': {
                this.nom_type = "National B";
                break;
            }
            case 'R': {
                this.nom_type = "Régional";
                break;
            }
            case 'D': {
                this.nom_type = "Départemental";
                break;
            }
            default: {
                this.nom_type = "";
            }
        } 
    }

    duAu() {
        var s: string;
        var optionsD = {weekday: "long", month: "long", day: "numeric"};
        var optionsF = {weekday: "long", year: "numeric", month: "long", day: "numeric"};        
        if (this.date_debut.getTime() === this.date_fin.getTime()) {
            s = "Le " + this.date_debut.toLocaleDateString("fr-FR" ,optionsF);
        }
        else {
            s = "Du " + this.date_debut.toLocaleDateString("fr-FR" ,optionsD) + " au " + this.date_fin.toLocaleDateString("fr-FR", optionsF);
        }
        return s;
    }

    dateDebut() {
        return this.date_debut.toLocaleDateString();
      }
    
    jours() {
        var debut = new Date(this.date_debut);
        var jours = [];
        for (var d = debut; d <= this.date_fin; d.setDate(d.getDate() + 1)) {
            jours.push(this.weekday(d.getDay()));
        }
        return jours.join(" - ");
    }
    
    private weekday(n) {
        var weekday = new Array(7);
        weekday[0] =  "Dimanche";
        weekday[1] = "Lundi";
        weekday[2] = "Mardi";
        weekday[3] = "Mercredi";
        weekday[4] = "Jeudi";
        weekday[5] = "Vendredi";
        weekday[6] = "Samedi";
        
        return weekday[n];
    }
    
    labelClass() {
        switch(this.type) { 
          case 'I': { 
            return 'label-danger';
         } 
         case 'NA': { 
             return 'label-warning';
          } 
          case 'NB': { 
            return 'label-warning';
          } 
          case 'R': { 
            return 'label-primary';
          } 
          case 'D': { 
            return 'label-default';
          } 
          default: { 
            return 'label-default';
          } 
        } 
    }
  }
