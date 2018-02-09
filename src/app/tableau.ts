export class Tableau {
    constructor(public _id:string, public tournoi_id:string, public nom:string, public description:string, public cl_min:number, public cl_max:number, public date_debut:Date, public nb_max:number) {
    }
}