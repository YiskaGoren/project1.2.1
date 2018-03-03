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
  constructor(private partyService: PartyService, private router: Router) { }

  ngOnInit() {
    this.newEvents.IdInviter = this.partyService.currentInviterId;
    this.newInviter.name =this.partyService.currentInviterName;
  }

  private AddEvent(){    
    this.partyService.AddEvent(this.newEvents).then(()=>{
      this.router.navigate(['menu']); 
      });
      
      return true;



      
  }
 

}
