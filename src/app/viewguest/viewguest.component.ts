import { Component, OnInit } from '@angular/core';
import { PartyService } from '../data/party-service';
import { Events } from '../model/events';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-viewguest',
  templateUrl: './viewguest.component.html',
  styleUrls: ['./viewguest.component.css',
  
]
})
export class ViewguestComponent implements OnInit {
  private partyType: Events[] = [];
  
   constructor(private partyService: PartyService) {
     
    }
 
   ngOnInit() {
      this.GetParty();
  }
  private GetParty(){
    this.partyService.GetParty().subscribe(partyType=>{
      this.partyType = partyType;
    });
  }
}
