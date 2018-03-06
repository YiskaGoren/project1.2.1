import { Component, OnInit } from '@angular/core';
import { Events } from '../model/events';
import {PartyService} from '../data/party-service';
import {Router} from "@angular/router";
import { Inviter } from '../model/inviter';
import { People } from '../model/people';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {
 private newEvents: Events = new Events();
 private newInviter:People = new People();
 private stringName:string='';
 private errorAdd: boolean = false;
 private success:boolean = false;
 private message: string = '';
 
  constructor(private partyService: PartyService, private router: Router) { }

  ngOnInit() {
    this.newEvents.IdInviter = this.partyService.currentInviterId;
    this.newInviter.name =this.partyService.currentInviterName;
    this.stringName=this.newInviter.name;
  }

  private AddEvent(){   
    if(!this.newEvents.Name|| !this.newEvents.Place || !this.newEvents.Name){
      this.errorAdd = true;
      this.message = 'נא מלא את כל השדות';
      return false;
    }
     

    this.partyService.AddEvent(this.newEvents).then(()=>{
      this.router.navigate(['menu']); 
      });
      
      return true;



      
  }
 

}
