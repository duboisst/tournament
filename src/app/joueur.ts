export class Joueur {
    constructor(public _id:string, 
                public licence:string, 
                public prenom:string, 
                public nom:string, 
                public sexe:string,
                public club:string, 
                public points:number,
                public numero:number,
                public categorie:string) {
    }

    get classement():string {
        var limit: number;
        var c: string;
        if (this.sexe == "M")
            limit = 1000
        else
            limit = 300;
        console.log("%s %s limit: %s", this.prenom, this.nom, limit)
        if (this.numero <= limit)
            c = "N°" + this.numero
        else
            c = this.points + " points";
        console.log("%s %s classement: %s", this.prenom, this.nom, c)
        return c
    }
  
}