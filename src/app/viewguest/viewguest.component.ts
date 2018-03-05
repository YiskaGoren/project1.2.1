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
  private newManaToMake: Mana;
  private volunteering: Mana;
  private newGuestView :Partisipation = new Partisipation();
  private IdPartyForView: number=this.partyService.currentPartyPartisipationId;
  private IdGuestMake:number =this.partyService.currentGuestId;
  private vMGuest:ViewGeustViewModel[ ] = [];
  private successAdd: boolean = false;
  private successChecked: boolean = false;
  private message: string;
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

  private onSelectMana(newManaToMake){
    if(newManaToMake.idSivog == 1){
      this.volunteering =  new Mana();
      this.volunteering.idGuest = this.IdGuestMake;
      this.volunteering.idParty = this.newManaToMake.idParty;
    }
    else
      this.volunteering = null;
  }

  private AddGuestMake(){    
    this.newManaToMake;
    
     this.partyService.AddGuestMake(this.newManaToMake,this.IdGuestMake, this.volunteering).then(()=>{
      this.newManaToMake= new Mana();
      console.log("120154"+this.newManaToMake.id);
      if(this.newManaToMake.idSivog==1)
     {
        this.successAdd=true;
     }
      this.successAdd = true;
      this.message = 'תודה על הכנתך!';
        // this.router.navigate(['']); 
       });
       
       return true;
   }
}
