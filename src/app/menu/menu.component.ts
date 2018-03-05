import { Component, OnInit } from '@angular/core';
import {PartyService} from '../data/party-service'
import {Mana} from '../model/mana'
import { Sivug } from '../model/sivug';
import { People } from '../model/people';
import { Events } from '../model/events';
  

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private newMana: Mana = new Mana();
  constructor(private partyService:PartyService) { }

  private manot: Mana[] = [];
  private mealTypes: Sivug[] = [];
  private partyId: number;
  private successAdd: boolean = false;
  private message: string;
  private newInviter:People = new People();
  private newEvents: Events = new Events();
  private stringName:string='';
  private stringEvent:string='';
  
  ngOnInit() {

    this.newInviter.name =this.partyService.currentInviterName;
    this.stringName=this.newInviter.name;

    this.newEvents.Name =this.partyService.currentEventName;
    this.stringEvent=this.newEvents.Name;

    this.GetMealTypes();
    this.partyId = this.partyService.currentPartyId;
    if(this.manot.length == 0){
      this.addNew();
    }
  }
  private GetMealTypes(){
    this.partyService.GetMealTypes().subscribe(mealTypes=>{
      this.mealTypes = mealTypes;
    });
  }
  private AddManot(){    
    this.partyService.AddManot(this.manot).then(()=>{
    
        this.successAdd = true;
        this.message = 'הנתונים נשמרו בהצלחה!';
     }
    );
      
      return true;
  }
  addNew (){
    let newMana= new Mana();
    newMana.idParty = this.partyId;
   
    this.manot.push(newMana);
  }
 
  delete(index){
    this.manot.splice(index,1);
  }
}


