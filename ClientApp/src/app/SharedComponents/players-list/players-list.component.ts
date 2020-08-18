import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Member } from 'src/app/Entities';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {

  @Input() _activePlayers:Member[];
  @Input() _activeButtonId:number;
  
  @Output() playerSelected = new EventEmitter<number>()
  constructor() { }

  ngOnInit() {
  }

  selectPlayer(event:any,index:number){
    this._activeButtonId = index;
    this.playerSelected.emit(index);
    //this.curMemberId = index;
    //TODO:disable other players' button
  }

}
