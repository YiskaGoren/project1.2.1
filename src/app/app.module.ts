import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { OpenComponent } from './open/open.component';
import { InveiterComponent } from './inveiter/inveiter.component';

import {RouterModule, Routes} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

import {HttpClientModule} from '@angular/common/http';

import { PartyService } from './data/party-service';
import { MenuComponent } from './menu/menu.component';
import { EventsComponent } from './events/events.component';
import { ViewguestComponent } from './viewguest/viewguest.component';
import { ReportInviterComponent } from './report-inviter/report-inviter.component';




const appRoutes: Routes=[
  {path:'',component:OpenComponent},
  {path:'person' , component:PersonComponent},
  {path:'inveiter' , component:InveiterComponent},
  {path:'events' , component:EventsComponent},
  {path:'menu' , component:MenuComponent},
  {path:'viewguest' , component:ViewguestComponent},
  {path:'reportinviter' , component:ReportInviterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    OpenComponent,
    InveiterComponent,
    NavbarComponent,
    MenuComponent,
    EventsComponent,
    ViewguestComponent,
    ReportInviterComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [PartyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
