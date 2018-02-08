import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Tournoi} from '../tournoi';
import { TournoiService } from '../tournoi.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  tournois: Tournoi[];

  constructor(private tournoiService: TournoiService, private router:Router) { 

  }

  ngOnInit() {
    this.tournoiService.getTournois().subscribe(_tournois => this.tournois = _tournois);
  }

  nombreTournois(type: string):number {
    if (type === undefined) {
      return this.tournois.length;
    }
    else {
      return this.tournois.filter(tournoi => tournoi.type == type).length;
    }
  }

  clickOnSearchButton(input) {
    this.router.navigate(['/tournois/search'], { queryParams: { q: input.value } });
  }

  onSearchEnter(input, e) {
      this.clickOnSearchButton(input);
  }
}
