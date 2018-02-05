import { Component, OnInit } from '@angular/core';
import {PartyService} from '../data/party-service'
import {Mana} from '../model/mana'
import {MenuViewModel} from './menu-view-model'
  

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private newMana: MenuViewModel = new MenuViewModel();
  constructor(private partyService:PartyService) { }

  private manot: Mana[] = [];
  ngOnInit() {
    this.partyService.getMana().subscribe(manot=>{
      this.manot = manot;
    });
  }

  private AddMana(){    
    this.partyService.AddMana(this.newMana).then(()=>{
       this.newMana = new MenuViewModel();
       this.partyService.getGest().subscribe(manot=>{
         this.manot = manot;
        });
      });
      
      return true;
  }
}


