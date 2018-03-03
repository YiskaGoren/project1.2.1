import { Component, OnInit } from '@angular/core';
import {ReportInviterViewModel } from './report-inviter-view-model';
import {PartyService} from '../data/party-service';

@Component({
  selector: 'app-report-inviter',
  templateUrl: './report-inviter.component.html',
  styleUrls: ['./report-inviter.component.css']
})
export class ReportInviterComponent implements OnInit {

  constructor(private partyService:PartyService) { }
  private reportViewModel:ReportInviterViewModel= new ReportInviterViewModel();
  ngOnInit() {
  }
    onBlurTz(){
      this.partyService.GetEventsByTz(this.reportViewModel).then((vm)=>{

      console.log(vm);
      });
  }
  onChangeEvents(currentEvent) {
    console.log(currentEvent);
    this.partyService.GetGuestAndManaByEventId(this.reportViewModel).then((vm)=>{

      console.log(vm);
      });
  }
}
