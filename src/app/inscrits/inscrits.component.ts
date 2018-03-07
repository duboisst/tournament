import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-inscrits',
  templateUrl: './inscrits.component.html',
  styleUrls: ['./inscrits.component.css']
})

export class InscritsComponent implements OnInit {
  @Input() tableau: any;
  
  joueurs: any[] = [];

  constructor() { }

  ngOnInit() {
    this.joueurs = this.tableau.inscrits;
  }

}
