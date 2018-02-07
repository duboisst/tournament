import { Tournoi } from './tournoi';
import { Tableau } from './tableau';
import { Joueur } from './joueur';

export const TOURNOIS: Tournoi[] = [
    new Tournoi(1,"CAM Bordeaux 2019",new Date("05/18/2019"), new Date("05/18/2019"),"NB", "blabla"), 
    new Tournoi(2,"Cognac 2018",new Date("05/09/2018"), new Date("05/13/2018"),"I", "blilia")
];

export const TABLEAUX: Tableau[] = [
    new Tableau(1, 2, "Tableau A", "de 500 à 999 points", 500, 999, new Date("05/10/2018 10:00"), 48),
    new Tableau(2, 2, "Tableau B", "de 1300 à N°300", 1300, 2250, new Date("05/10/2018 11:00"), 10),
    new Tableau(3, 1, "Tableau A", "de 500 à 1299 points", 500, 1299, new Date("05/18/2019 09:00"), 96),
    new Tableau(4, 1, "Tableau B", "de 500 à 1599 points", 500, 1599, new Date("05/18/2018 10:00"), 96)
];

export const JOUEURS: Joueur[] = [
    new Joueur(1, "3339022", "Stéphane", "Dubois", "CAM Bordeaux", "940"),
    new Joueur(2, "3338295", "Arthur", "Dubois", "CAM Bordeaux", "950"),
    new Joueur(3, "3338066", "Léo", "Dubois", "CAM Bordeaux", "1384")
];

export const INSCRITS = [
    {"tableau_id": 1, "joueur": JOUEURS.find(j => {return j._id == 1;})},
    {"tableau_id": 1, "joueur": JOUEURS.find(j => {return j._id == 2;})},
    {"tableau_id": 2, "joueur": JOUEURS.find(j => {return j._id == 3;})},
    {"tableau_id": 3, "joueur": JOUEURS.find(j => {return j._id == 2;})},
    {"tableau_id": 3, "joueur": JOUEURS.find(j => {return j._id == 1;})},
    {"tableau_id": 4, "joueur": JOUEURS.find(j => {return j._id == 1;})},
    {"tableau_id": 4, "joueur": JOUEURS.find(j => {return j._id == 2;})},
    {"tableau_id": 4, "joueur": JOUEURS.find(j => {return j._id == 3;})}
]
