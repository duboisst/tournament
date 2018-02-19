import { Tournoi } from './tournoi';
import { Tableau } from './tableau';
import { Joueur } from './joueur';

const toutes_categories = ['B1', 'B2', 'M1', 'M2', 'C1', 'C2', 'J1', 'J2', 'J3', 'S', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];
const tous_sexes = ['M', 'F'];
const max_classement = 10000;
const min_classement = 500;
const max_numero = 0;

export const TOURNOIS: Tournoi[] = [
    new Tournoi("1","CAM Bordeaux 2019", "NB", "blabla", [{jour: new Date("05/18/2019"), nb:2}]), 
    new Tournoi("2","Cognac 2018", "I", "lorem ipsum ...", [{jour: new Date("05/09/2018"), nb:2}, {jour: new Date("05/10/2018"), nb:3}, {jour: new Date("05/11/2018"), nb:1}, {jour: new Date("05/12/2018"), nb:3}, {jour: new Date("05/13/2018"), nb:2}])
];

export const TABLEAUX: Tableau[] = [
    new Tableau("1", "2", "Tableau A", "de 500 à 999 points", min_classement, 999, max_numero, toutes_categories, tous_sexes, new Date("05/10/2018 10:00"), 48, 6, []),
    new Tableau("2", "2", "Tableau B", "de 1300 à N°300", 1300, max_classement, 300, toutes_categories, tous_sexes, new Date("05/10/2018 11:00"), 48, 8, []),    
    new Tableau("5", "2", "Tableau C", "de 500 à 1299", min_classement, 1299, max_numero, toutes_categories, tous_sexes, new Date("05/10/2018 12:00"), 48, 8, []),
    new Tableau("6", "2", "Tableau D", "de 500 à 1799", min_classement, 1799, max_numero, toutes_categories, tous_sexes, new Date("05/10/2018 13:00"), 48, 8, []),
    new Tableau("7", "2", "Tableau E", "de 500 à 1599", min_classement, 1599, max_numero, toutes_categories, tous_sexes, new Date("05/10/2018 14:00"), 48, 8, []),
    new Tableau("8", "2", "Tableau F", "de 500 à 1399", min_classement, 1399, max_numero, toutes_categories, tous_sexes, new Date("05/10/2018 15:00"), 48, 8, ['11', '13']),
    new Tableau("9", "2", "Tableau G", "Vétérans", min_classement, max_classement, max_numero, ["V1", "V2", "V3", "V4", "V5", "V6"], tous_sexes, new Date("05/10/2018 16:00"), 48, 7, []),
    new Tableau("10", "2", "Tableau L", "Toutes séries", min_classement, 10000, max_numero, toutes_categories, tous_sexes, new Date("05/11/2018 15:00"), 96, 10, []),
    new Tableau("11", "2", "Tableau I", "Poussins / Benjamins", min_classement, max_classement, max_numero, ['P', 'B1', 'B2'], tous_sexes, new Date("05/10/2018 18:00"), 24, 5, ['13', '8']),
    new Tableau("13", "2", "Tableau J", "Minimes / Cadets", min_classement, max_classement, max_numero, ['P', 'B1', 'B2', 'M1', 'M2', 'C1', 'C2'], tous_sexes, new Date("05/10/2018 18:00"), 24, 5, ['11', '8']),
    new Tableau("12", "2", "Tableau K", "Toutes séries dames", min_classement, max_classement, max_numero, toutes_categories, ['F'], new Date("05/11/2018 14:00"), 96, 8, []),    
    new Tableau("3", "1", "Tableau A", "de 500 à 1299 points", min_classement, 1299, max_numero, toutes_categories, tous_sexes, new Date("05/18/2019 09:00"), 96, 7, []),
    new Tableau("4", "1", "Tableau B", "de 500 à Non numéroté", min_classement, max_classement, 1001, toutes_categories, tous_sexes, new Date("05/18/2019 10:00"), 6, 7, []),
    new Tableau("14", "1", "Tableau C", "de 500 à 1599", min_classement, 1599, max_numero, toutes_categories, tous_sexes, new Date("05/18/2019 11:00"), 6, 7, [])
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
