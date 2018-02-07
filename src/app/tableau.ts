export class Tableau {
    _id: string;
    tournoi_id: string;
    nom: string;
    description: string;
    cl_min: number;
    cl_max: number;
    date_debut: Date;
    nb_max: number;

    constructor(_id, tournoi_id, nom, description, cl_min, cl_max, date_debut, nb_max) {
        this._id = _id; this.tournoi_id = tournoi_id, this.nom = nom; this.description = description, this.cl_min = cl_min, this.cl_max = cl_max, this.date_debut = date_debut, this.nb_max = nb_max;
    }

}
