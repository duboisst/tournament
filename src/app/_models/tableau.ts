export class Tableau {
    constructor(public _id:string, 
                public tournoi_id:string, 
                public nom:string, 
                public description:string, 
                public cl_min:number, 
                public cl_max:number, 
                public numero_max:number,
                public categories: string[],
                public sexes: string[],
                public date_heure_debut:Date, 
                public nb_max:number,
                public tarif:number,
                public tableaux_non_compatibles: string[],
            ) {
    }

    get date_debut():Date {
        return new Date(this.date_heure_debut.getFullYear(), this.date_heure_debut.getMonth(), this.date_heure_debut.getDate());
    }

    get heureDebut(): string {
        var debut = new Date(this.date_heure_debut);
        return ("0" + debut.getHours()).slice(-2) + "h" + ("0" + debut.getMinutes()).slice(-2);
        
    }

    static mapTableaux(tableaux):Tableau[] {
        return tableaux.map(t=>new Tableau(t._id,t.tournoi_id,t.nom,t.description,t.cl_min,t.cl_max,t.numero_max,t.caregories,t.sexes,new Date(t.date_heure_debut), t.nb_max, t.tarif, t.tableaux_non_compatibles));
    }
    
}
