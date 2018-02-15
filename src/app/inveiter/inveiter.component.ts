import { Component, OnInit } from '@angular/core';
import {People} from '../model/people';
import { Inviter } from '../model/inviter';
import {PartyService} from '../data/party-service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-inveiter',
  templateUrl: './inveiter.component.html',
  styleUrls: ['./inveiter.component.css']
})
export class InveiterComponent implements OnInit {
  private newInviter: People = new People();

  private errorAdd: boolean = false;
  private message: string = '';
  
  constructor(private partyService: PartyService, private router: Router) { }

  ngOnInit() {
  
  }


  private AddInviter(){    
   
    if(!this.newInviter.name || !this.newInviter.peopleId || !this.newInviter.mailAddress || !this.newInviter.phone){
      this.errorAdd = true;
      this.message = 'נא מלא את כל השדות';
      return false;
    }
    
    this.partyService.AddInviter(this.newInviter).then(()=>{
        this.router.navigate(['events']); 
      });
      
      return true;
  }

}

  