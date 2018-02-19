import { Component, OnInit } from '@angular/core';
import { PartyService } from '../data/party-service';
import { Events } from '../model/events';
import { HtmlParser } from '@angular/compiler';
import { Partisipation } from '../model/partisipation';
import { Mana } from '../model/mana';

@Component({
  selector: 'app-viewguest',
  templateUrl: './viewguest.component.html',
  styleUrls: ['./viewguest.component.css',
  
]
})
export class ViewguestComponent implements OnInit {
  private partyType: Events[] = [];
  private manot: Mana[] = [];
  private newGuestView :Partisipation = new Partisipation();
   constructor(private partyService: PartyService) {
     
    }
 
   ngOnInit() {

     
      this.newGuestView.idGuest = this.partyService.currentGuestId;
      this.newGuestView.idParty = this.partyService.currentPartyPartisipationId;
      this.GetMenuForChoose();
  }
  // private GetParty(){
  //   this.partyService.GetParty().subscribe(partyType=>{
  //     this.partyType = partyType;
  //   });
  // }

  private GetMenuForChoose(){
    this.partyService.GetMenuForChoose().subscribe(manot=>{
      this.manot = manot;
    });
  }
}
