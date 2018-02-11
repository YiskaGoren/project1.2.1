import { Component, OnInit } from '@angular/core';
import {InviterViewModel} from './inviter-view-model'
import { Inviter } from '../model/inviter';
import {PartyService} from '../data/party-service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-inveiter',
  templateUrl: './inveiter.component.html',
  styleUrls: ['./inveiter.component.css']
})
export class InveiterComponent implements OnInit {
  private newInviter: InviterViewModel = new InviterViewModel();
  private inviters: Inviter[] = [];
  private errorAdd: boolean = false;
  private message: string = '';
  
  constructor(private partyService: PartyService, private router: Router) { }

  ngOnInit() {
    this.partyService.getInviter().subscribe(inviter=>{
      this.inviters = inviter;
    });
  }


  private AddInviter(){    
   
    if(!this.newInviter.name || !this.newInviter.id || !this.newInviter.mailAdress || !this.newInviter.phone){
      this.errorAdd = true;
      this.message = 'נא מלא את כל השדות';
      return false;
    }
    
    this.partyService.AddInviter(this.newInviter).then(()=>{
       this.newInviter = new InviterViewModel();
       this.partyService.getInviter().subscribe(inviters=>{
         this.inviters = inviters;
        });
        this.router.navigate(['menu']); 
      });
      
      return true;
  }

}

  