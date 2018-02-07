import { Component, OnInit, Input } from '@angular/core';

import { Joueur } from '../joueur';
import { Tableau } from '../tableau';
import { TournoiService } from '../tournoi.service';

@Component({
  selector: 'app-inscrits',
  templateUrl: './inscrits.component.html',
  styleUrls: ['./inscrits.component.css']
})

export class InscritsComponent implements OnInit {
  @Input() tableau: Tableau;
  @Input() i: number;
  
  joueurs: Joueur[] = [];

  constructor(private tournoiService: TournoiService) { }

  ngOnInit() {
    this.getInscrits(this.tableau);
  }

  getInscrits(tableau): void {
    this.tournoiService.getInscrits(tableau._id).subscribe(inscrits => this.joueurs = inscrits)
  }

  listeJoueurs(): string {
    return this.joueurs.map(j => j.prenom).join()
  }
}
