import {Tableau} from './tableau';

export class Tournoi {
    nom_type: string;
    constructor(public _id:string, public nom:string, public date_debut:Date, public date_fin:Date, public type:string, public description:string) {
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

    duAu(): string {
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

    dateDebut(): string {
        return this.date_debut.toLocaleDateString();
      }
    
    jours(): string {
        var debut = new Date(this.date_debut);
        var jours = [];
        for (var d = debut; d <= this.date_fin; d.setDate(d.getDate() + 1)) {
            jours.push(this.weekday(d.getDay()));
        }
        return jours.join(" - ");
    }
    
    private weekday(n): string {
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

    labelClass():string {
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
