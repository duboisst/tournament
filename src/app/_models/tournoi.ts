import {Tableau} from './tableau';

export class Tournoi {
    constructor(public _id:string, 
                public nom:string, 
                public type:string, 
                public description:string, 
                public nb_tableaux_max_par_jour: any[]) {
    }

    get date_debut():Date {
        var dates = this.nb_tableaux_max_par_jour.map(element => element.jour).sort(function(d1, d2) {
            if (d1 > d2) return 1;
            if (d1 < d2) return -1;
            return 0;
        });
        return dates[0];
    }

    get date_fin():Date {
        var dates = this.nb_tableaux_max_par_jour.map(element => element.jour).sort(function(d1, d2) {
            if (d1 > d2) return -1;
            if (d1 < d2) return 1;
            return 0;
        });
        return dates[0];
    }

    get nom_type(): string {
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
    }
    
    get duAu(): string {
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

    get dateDebut(): string {
        return this.date_debut.toLocaleDateString("fr-FR", {year: "numeric", month: "long", day: "numeric"});
      }
    
    get jours(): string {
        var debut = new Date(this.date_debut);
        var jours = [];
        for (var d = debut; d <= this.date_fin; d.setDate(d.getDate() + 1)) {
            jours.push(this.weekday(d.getDay()));
        }
        return jours.join(" - ");
    }
    
    get labelClass():string {
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


}
