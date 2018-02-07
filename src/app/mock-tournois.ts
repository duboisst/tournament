import { Tournoi } from './tournoi';
import { Tableau } from './tableau';

export const TOURNOIS: Tournoi[] = [
    new Tournoi(1,"CAM Bordeaux 2019",new Date("05/18/2019"), new Date("05/18/2019"),"NB", "blabla"), 
    new Tournoi(2,"Cognac 2018",new Date("05/09/2018"), new Date("05/13/2018"),"I", "blilia")
];

export const TABLEAUX: Tableau[] = [
    new Tableau(1, 2, "Tableau A", "de 500 à 999 points", 500, 999, new Date("05/10/2018 10:00"), 48),
    new Tableau(2, 2, "Tableau B", "de 1400 à N°300", 1400, 2250, new Date("05/10/2018 11:00"), 10),
    new Tableau(3, 1, "Tableau A", "de 500 à 1299 points", 500, 1299, new Date("05/18/2019 09:00"), 96),
    new Tableau(4, 1, "Tableau B", "de 500 à 1599 points", 500, 1599, new Date("05/18/2018 10:00"), 96)
];
