import { Component, OnInit } from '@angular/core';
import { PartyService } from '../data/party-service';
import { Events } from '../model/events';
import { HtmlParser } from '@angular/compiler';
import { Partisipation } from '../model/partisipation';
import { Mana } from '../model/mana';
import {Router} from "@angular/router";
import { ViewGeustViewModel } from './viewGeustViewModel';

@Component({
  selector: 'app-viewguest',
  templateUrl: './viewguest.component.html',
  styleUrls: ['./viewguest.component.css',
  
]
})
export class ViewguestComponent implements OnInit {
  private partyType: Events[] = [];
  private manot: Mana[] = [];
  private newManaToMake: Mana = new Mana();
  private newGuestView :Partisipation = new Partisipation();
  private IdPartyForView: number=this.partyService.currentPartyPartisipationId;
  private IdGuestMake:number =this.partyService.currentGuestId;
  private vMGuest:ViewGeustViewModel[ ] = [];

   n:number;
   constructor(private partyService: PartyService, private router: Router) {
     
    }
 
   ngOnInit() {
  
    this.n=21; 
    // this.IdPartyForView=this.partyService.currentPartyPartisipationId;
     console.log("kk"+this.IdPartyForView);
     this.GetMenuForChoose();
  }

 // this.IdPartyForView
  private GetMenuForChoose( ){
   
    this.partyService.GetMenuForChoose(this.IdPartyForView).subscribe(manot=>{
      this.manot = manot;
    });
  }

  private AddGuestMake(){    
    
     this.partyService.AddGuestMake(this.manot,this.IdGuestMake).then(()=>{
        // this.router.navigate(['']); 
       });
       
       return true;
   }
}
