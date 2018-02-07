import { Component, OnInit } from '@angular/core';

import {Tournoi} from '../tournoi';
import { TournoiService } from '../tournoi.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  tournois: Tournoi[];

  constructor(private tournoiService: TournoiService) { }

  ngOnInit() {
    this.tournoiService.getTournois().subscribe(_tournois => this.tournois = _tournois);
  }

  nombreTournois(type: string):number {
    if (type === undefined) {
      return this.tournois.length;
    }
    else {
      return this.tournois.filter(function(element) {
        return element.type == type;
      }).length;
      }
    }
  }

}
