import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-player',
  templateUrl: './game-player.component.html',
  styleUrls: ['./game-player.component.css']
})
export class GamePlayerComponent implements OnInit {

  @Input() name = "Player";
  @Input() saving = 0.0;

  constructor() { }

  ngOnInit() {
  }

}
