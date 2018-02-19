import { Tournoi } from './tournoi';
import { Tableau } from './tableau';
import { Joueur } from './joueur';

export const TOURNOIS: Tournoi[] = [
    new Tournoi("1","CAM Bordeaux 2019",new Date("05/18/2019"), new Date("05/18/2019"),"NB", "blabla"), 
    new Tournoi("2","Cognac 2018",new Date("05/09/2018"), new Date("05/13/2018"),"I", "blilia")
];

export const TABLEAUX: Tableau[] = [
    new Tableau("1", "2", "Tableau A", "de 500 à 999 points", 500, 999, new Date("05/10/2018 10:00"), 48, 6),
    new Tableau("2", "2", "Tableau B", "de 1300 à N°300", 1300, 2250, new Date("05/10/2018 11:00"), 48, 8),
    new Tableau("3", "1", "Tableau A", "de 500 à 1299 points", 500, 1299, new Date("05/18/2019 09:00"), 96, 7),
    new Tableau("4", "1", "Tableau B", "de 500 à Non numéroté", 500, 2050, new Date("05/18/2018 10:00"), 6, 7)
];

export const JOUEURS: Joueur[] = [
    new Joueur("1", "3339022", "Stéphane", "Dubois", "M", "CAM Bordeaux", 940, 26547, "V1"),
    new Joueur("2", "3338295", "Arthur", "Dubois", "M", "CAM Bordeaux", 950, 24912, "B1"),
    new Joueur("3", "3338066", "Léo", "Dubois", "M", "CAM Bordeaux", 1384, 9009, "C2"),
    new Joueur("4", "3338173", "Cyril", "Klein", "M", "CAM Bordeaux", 1090, 20621, "V1"),
    new Joueur("5", "3338173", "Hugo", "Klein", "M", "CAM Bordeaux", 1867, 1726, "J2"),
    new Joueur("6", "3335924", "Thomas", "Taillade", "M", "SA Mérignac", 1527, 5344, "C2"),
    new Joueur("7", "3336028", "Pierre", "Carrat", "M", "US Talence", 1206, 14568, "C2"),
    new Joueur("8", "3332154", "Arnaud", "Gireau", "M", "CAM Bordeaux", 2193, 570, "J3"),
    new Joueur("9", "244431", "Sarah", "Fonvielle", "F", "CAM Bordeaux", 1719, 187, "S"),
];

export const INSCRITS = [
    {"tableau_id": 1, "joueur": JOUEURS.find(j => {return j._id == "1";})},
    {"tableau_id": 1, "joueur": JOUEURS.find(j => {return j._id == "2";})},
    {"tableau_id": 4, "joueur": JOUEURS.find(j => {return j._id == "1";})},
    {"tableau_id": 4, "joueur": JOUEURS.find(j => {return j._id == "2";})},
    {"tableau_id": 4, "joueur": JOUEURS.find(j => {return j._id == "3";})},
    {"tableau_id": 4, "joueur": JOUEURS.find(j => {return j._id == "4";})},
    {"tableau_id": 4, "joueur": JOUEURS.find(j => {return j._id == "5";})},
    {"tableau_id": 4, "joueur": JOUEURS.find(j => {return j._id == "6";})},
    {"tableau_id": 3, "joueur": JOUEURS.find(j => {return j._id == "2";})},
    {"tableau_id": 3, "joueur": JOUEURS.find(j => {return j._id == "4";})},
    {"tableau_id": 2, "joueur": JOUEURS.find(j => {return j._id == "5";})},
    {"tableau_id": 2, "joueur": JOUEURS.find(j => {return j._id == "6";})},
    {"tableau_id": 2, "joueur": JOUEURS.find(j => {return j._id == "3";})},
    {"tableau_id": 2, "joueur": JOUEURS.find(j => {return j._id == "8";})},
    {"tableau_id": 2, "joueur": JOUEURS.find(j => {return j._id == "9";})},
]
