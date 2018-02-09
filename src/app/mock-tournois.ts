import { Tournoi } from './tournoi';
import { Tableau } from './tableau';
import { Joueur } from './joueur';

export const TOURNOIS: Tournoi[] = [
    new Tournoi("1","CAM Bordeaux 2019",new Date("05/18/2019"), new Date("05/18/2019"),"NB", "blabla"), 
    new Tournoi("2","Cognac 2018",new Date("05/09/2018"), new Date("05/13/2018"),"I", "blilia")
];


export const TABLEAUX: Tableau[] = [
    {_id: "1", tournoi_id: "2", nom: "Tableau A", description: "de 500 à 999 points", cl_min: 500, cl_max: 999, date_debut: new Date("05/10/2018 10:00"), nb_max:48},
    {_id: "2", tournoi_id: "2", nom: "Tableau B", description: "de 500 à 1399 points", cl_min: 500, cl_max: 1399, date_debut: new Date("05/10/2018 10:00"), nb_max:48},
    {_id: "3", tournoi_id: "1", nom: "A", description: "de 500 à 1799 points", cl_min: 500, cl_max: 1799, date_debut: new Date("05/22/2018 5:52"), nb_max:48},
    {_id: "4", tournoi_id: "1", nom: "B", description: "de 500 à 1799 points", cl_min: 500, cl_max: 1799, date_debut: new Date("05/10/2018 10:00"), nb_max:48},
    {_id: "5", tournoi_id: "1", nom: "C", description: "de 500 à 1799 points", cl_min: 500, cl_max: 1799, date_debut: new Date("05/10/2018 10:00"), nb_max:48},
    {_id: "6", tournoi_id: "1", nom: "D", description: "de 500 à 1799 points", cl_min: 500, cl_max: 1799, date_debut: new Date("05/10/2018 10:00"), nb_max:48},
    {_id: "7", tournoi_id: "1", nom: "E", description: "de 500 à 1799 points", cl_min: 500, cl_max: 1799, date_debut: new Date("05/10/2018 10:00"), nb_max:48},
    {_id: "8", tournoi_id: "1", nom: "F", description: "de 500 à 1799 points", cl_min: 500, cl_max: 1799, date_debut: new Date("05/10/2018 10:00"), nb_max:48},
    {_id: "9", tournoi_id: "1", nom: "G", description: "de 500 à 1799 points", cl_min: 500, cl_max: 1799, date_debut: new Date("05/10/2018 10:00"), nb_max:48},
    {_id: "10", tournoi_id: "1", nom: "H", description: "de 500 à 1799 points", cl_min: 500, cl_max: 1799, date_debut: new Date("05/10/2018 10:00"), nb_max:48},
    {_id: "11", tournoi_id: "1", nom: "I", description: "de 500 à 1799 points", cl_min: 500, cl_max: 1799, date_debut: new Date("05/10/2018 10:00"), nb_max:48},
    {_id: "12", tournoi_id: "1", nom: "J", description: "de 500 à 1799 points", cl_min: 500, cl_max: 1799, date_debut: new Date("05/10/2018 10:00"), nb_max:48},
];

export const JOUEURS: Joueur[] = [
    {_id:"1", licence:"3339022", prenom:"Stéphane", nom:"Dubois", club:"CAM Bordeaux", classement:940, categorie:"V1"},
    {_id:"2", licence:"3338295", prenom:"Arthur", nom:"Dubois", club:"CAM Bordeaux", classement:950, categorie:"B1"},
    {_id:"3", licence:"3338066", prenom:"Léo", nom:"Dubois", club:"CAM Bordeaux", classement:1384, categorie:"C2"},
    {_id:"4", licence:"3338173", prenom:"Cyril", nom:"Klein", club:"CAM Bordeaux", classement:1090, categorie:"V1"},
    {_id:"5", licence:"3338173", prenom:"Hugo", nom:"Klein", club:"CAM Bordeaux", classement:1867, categorie:"J2"},
    {_id:"6", licence:"3335924", prenom:"Thomas", nom:"Taillade", club:"SA Mérignac", classement:1527, categorie:"C2"},
    {_id:"7", licence:"3336028", prenom:"Pierre", nom:"Carrat", club:"US Talence", classement:1206, categorie:"C2"}
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
    {"tableau_id": 3, "joueur": JOUEURS.find(j => {return j._id == "1";})},
    {"tableau_id": 2, "joueur": JOUEURS.find(j => {return j._id == "1";})},
    {"tableau_id": 2, "joueur": JOUEURS.find(j => {return j._id == "2";})},
    {"tableau_id": 2, "joueur": JOUEURS.find(j => {return j._id == "3";})}
]
