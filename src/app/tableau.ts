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
                public date_debut:Date, 
                public nb_max:number,
                public tarif:number,
            ) {
    }

    get heureDebut(): string {
        var debut = new Date(this.date_debut);
        return debut.toLocaleString();
      }
    
}
