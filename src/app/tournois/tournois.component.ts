import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tournoi } from '../tournoi';
import { TournoiService } from '../tournoi.service';

@Component({
  selector: 'app-tournois',
  templateUrl: './tournois.component.html',
  styleUrls: ['./tournois.component.css']
})
export class TournoisComponent implements OnInit {
  tournois: Tournoi[];

  constructor(private tournoiService: TournoiService, private route: ActivatedRoute) { 
    route.params.subscribe(val => {
      // put the code from `ngOnInit` here
      this.getTournois();
    });
  }

  ngOnInit() {
    
  }

  getTournois(): void {
    var type = this.route.snapshot.params['type'];
    this.tournoiService.getTournois().subscribe(tournois => { 
      if (type) {
        this.tournois = tournois.filter(function(t) {
          return t.type == type;
        });
      }
      else {
        this.tournois = tournois;
      }
    });
  }

}
