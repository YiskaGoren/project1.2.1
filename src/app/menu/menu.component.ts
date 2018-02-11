import { Component, OnInit } from '@angular/core';
import {PartyService} from '../data/party-service'
import {Mana} from '../model/mana'
import {MenuViewModel} from './menu-view-model'
import { Sivug } from '../model/sivug';
  

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
  editMana: Mana; 

  ngOnInit() {
    this.GetMealTypes()
   /* this.partyService.getMana().subscribe(manot=>{
      this.manot = manot;
    });*/
    if(this.manot.length == 0){
      this.addNew();
    }
  }
  private GetMealTypes(){
    this.partyService.GetMealTypes().subscribe(mealTypes=>{
      this.mealTypes = mealTypes;
    });
  }
  private AddMana(){    
    this.partyService.AddMana(this.newMana).then(()=>{
       this.newMana = new Mana();
       this.partyService.getMana().subscribe(manot=>{
         this.manot = manot;
        });
      });
      
      return true;
  }
  addNew (){
    this.manot.push(new Mana());
  }
  edit(mana) {
    this.editMana = mana;
  }
  update(mana){
    this.newMana = mana;
    this.AddMana();
  }
  delete(mana){

  }
}


