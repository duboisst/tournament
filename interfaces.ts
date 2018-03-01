export interface ITournoi {
    _id: string;  
    type: String,
    description: String,
    nb_tableaux_max_par_jour: Array<any>,
    updated_date: Date
  }