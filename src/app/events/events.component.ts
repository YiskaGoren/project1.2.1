import { Component, OnInit } from '@angular/core';
import { Events } from '../model/events';
import{PartyService} from '../data/party-service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {
  private newEvents: Events = new Events();
  private eventsArr: Events[] = []; 
  constructor(private partyService: PartyService) { }

  ngOnInit() {
    this.partyService.getEvent().subscribe(events=>{
      this.eventsArr = events;
    });
  }

  private AddEvent(){    
    this.partyService.AddEvent(this.newEvents).then(()=>{
       this.newEvents = new Events();
       this.partyService.getEvent().subscribe(partys=>{
         this.eventsArr = partys;
        });
      });
      
      return true;



      
  }
 

}
