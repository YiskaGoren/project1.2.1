import { Component, OnInit } from '@angular/core';
import { GuestViewModel } from './guest-view-model';
import { PartyService } from '../data/party-service';
import { Guest } from '../model/guest';
import { HtmlParser } from '@angular/compiler';
import { Events } from '../model/events';
import { People } from '../model/people';
import { Partisipation } from '../model/partisipation';
import {Router} from "@angular/router";


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {

private newGuest: People = new People();
private guests: People[] = [];
private partisipation = new Partisipation();
 private partyType: Events[] = [];
 private newPartyType: Events = new Events();
 private errorAdd: boolean = false;
 private success:boolean = false;
 private message: string = '';
  constructor(private partyService: PartyService, private router: Router) {
    
   }

  ngOnInit() {
     this.GetParty();
    

   this.partyService.getGest().subscribe(guests=>{
      this.guests = guests;
    });
  } 
   private AddGuest(){  
    if(!this.newGuest.name || !this.newGuest.peopleId || !this.newGuest.mailAddress ){
      this.errorAdd = true;
      this.message = 'נא מלא את כל השדות';
      return false;
    }  
    this.newGuest;
    this.newPartyType;
    
        this.partyService.AddGuest(this.newGuest,this.newPartyType).then(()=>{
           
           this.newGuest = new People();
           this.newPartyType=new Events();
           this.partyService.getGest().subscribe(guests=>{
             this.guests = guests;
             this.router.navigate(['viewguest']);
            });
      
          }).catch(()=>{
            
          });
          
      

          return true;
      }


      private GetParty(){
        this.partyService.GetParty().then(partyType=>{
          this.partyType = partyType;
         });

      }

     
      
}
