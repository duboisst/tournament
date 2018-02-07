import { Component, OnInit } from '@angular/core';

import { Tournoi } from '../tournoi';
import { TournoiService } from '../tournoi.service';

@Component({
  selector: 'app-tournois',
  templateUrl: './tournois.component.html',
  styleUrls: ['./tournois.component.css']
})
export class TournoisComponent implements OnInit {
  tournois: Tournoi[];

  constructor(private tournoiService: TournoiService) { }

  ngOnInit() {
    this.getTournois();
  }

  getTournois(): void {
    this.tournoiService.getTournois().subscribe(tournois => this.tournois = tournois);
  }

}
