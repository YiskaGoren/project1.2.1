import { Component, OnInit } from '@angular/core';
import { GuestViewModel } from './guest-view-model';
import { PartyService } from '../data/party-service';
import { Guest } from '../model/guest';
import { HtmlParser } from '@angular/compiler';
import { Events } from '../model/events';
import { People } from '../model/people';



@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {

private newGuest: People = new People();
private guests: People[] = [];

 private partyType: Events[] = [];
 
  constructor(private partyService: PartyService) {
    
   }

  ngOnInit() {
     this.GetParty();


   this.partyService.getGest().subscribe(guests=>{
      this.guests = guests;
    });
  } 
   private AddGuest(){    
    this.newGuest;
        this.partyService.AddGuest(this.newGuest).then(()=>{
           this.newGuest = new People();
           this.partyService.getGest().subscribe(guests=>{
             this.guests = guests;
            });
          }).catch(()=>{
            
          });
          
          return true;
      }


      private GetParty(){
        this.partyService.GetParty().subscribe(partyType=>{
          this.partyType = partyType;
        });
      }

     
      
}
