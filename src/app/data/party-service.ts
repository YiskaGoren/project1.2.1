import { Injectable } from "@angular/core/";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Guest } from '../model/guest';
import { Inviter } from '../model/inviter';
import { Mana } from '../model/mana';
import { Sivug } from '../model/sivug';
import { DbGuest } from '../../db/dbGuest';
import { DbInviter } from '../../db/dbInviter';
import { DbMana } from '../../db/dbMana';
import 'rxjs/add/operator/combineLatest';
import { GuestViewModel } from "../person/guest-view-model";

import {MenuViewModel } from '../menu/menu-view-model'
import { Events } from "../model/events";
import { DbEvents } from "../../db/dbEvents";
import { People } from "../model/people";
 import {DbPeople} from '../../db/dbPeople';
import {DbPartisipation} from '../../db/dbPartisipation';
import { Partisipation } from "../model/partisipation";

@Injectable()
export class PartyService {
    constructor(private httpClient: HttpClient) { }

    baseUrl: string = 'http://localhost:3000';
    currentInviterId:number;
    currentGuestId:number;
    currentPartyPartisipationId:number;
    currentPartyId:number;

   /* getEvent(): Observable<Events[]> {
        let Url = this.baseUrl + '/partys';
        let dbParty$ = this.httpClient.get<DbEvents[]>(Url);

      return dbParty$.combineLatest(dbParty$, (dbParty) => {
            let partys: Events[] = [];

            for (let i = 0; i < DbEvents.length; i++) {
                let party = new Events();
                party.Id = dbParty[i].id;
                party.IdInviter = dbParty[i].idInviter;
                party.Name = dbParty[i].name;
                party.NumTakePart = dbParty[i].numTackPart;   
                party.Place= dbParty[i].place; 
                party.MilkMeat= dbParty[i].meatMilk; 
                party.DateEvent= dbParty[i].dateEvent;                       
                partys.push(party);
            }

            return partys;
        })
    }*/



    getGest(): Observable<People[]> {
// מהserverהפונקציה מחזירה את טבלת מוזמנים
        let guestsUrl = this.baseUrl + '/people';
        let dbGuests$ = this.httpClient.get<DbPeople[]>(guestsUrl);

      return dbGuests$.combineLatest(dbGuests$, (dbGuest) => {
            let guests: People[] = [];

            for (let i = 0; i < DbEvents.length; i++) {
                let people = new People();
                people.id=dbGuest[i].id;
                people.name=dbGuest[i].name;
                people.peopleId=dbGuest[i].tz;
                people.mailAddress=dbGuest[i].mailAddress;
                people.phone=dbGuest[i].phone;               
                guests.push(people);
            }

            return guests;



        })
    }
    getInviter(): Observable<People[]> {
        let guestsUrl = this.baseUrl + '/people';
        let dbGuests$ = this.httpClient.get<DbPeople[]>(guestsUrl);

      return dbGuests$.combineLatest(dbGuests$, (dbGuest) => {
            let guests: People[] = [];

            for (let i = 0; i < DbEvents.length; i++) {
                let people = new People();
                people.id=dbGuest[i].id;
                people.name=dbGuest[i].name;
                people.peopleId=dbGuest[i].tz;
                people.mailAddress=dbGuest[i].mailAddress;
                people.phone=dbGuest[i].phone;               
                guests.push(people);
            }

            return guests;



        })
            }


//יש להוסיף לפונקציה סינון לפי ID 
//של מזמין
            getMana(): Observable<Mana[]> {
                let manaUrl = this.baseUrl + '/manot';
                let dbMana$ = this.httpClient.get<DbMana[]>(manaUrl);
        
              return dbMana$.combineLatest(dbMana$, (dbMana) => {
                    let manot: Mana[] = [];
        
                    for (let i = 0; i < DbMana.length; i++) {
                        let mana = new Mana();
                        mana.id = dbMana[i].id;
                        mana.idSivog = dbMana[i].idSivog;
                        mana.name = dbMana[i].nameMana;
                        mana.idParty = dbMana[i].idParty;        
                        manot.push(mana);
                    }
        
                    return manot;
                })
            }





            getEvent(): Observable<Events[]> {
                let Url = this.baseUrl + '/partys';
                let dbParty$ = this.httpClient.get<DbEvents[]>(Url);
        
              return dbParty$.combineLatest(dbParty$, (dbParty) => {
                    let partys: Events[] = [];
        
                    for (let i = 0; i < DbEvents.length; i++) {
                        let party = new Events();
                        party.Id = dbParty[i].id;
                        party.IdInviter = dbParty[i].idInviter;
                        party.Name = dbParty[i].name;
                        party.NumTakePart = dbParty[i].numTackPart;   
                        party.Place= dbParty[i].place; 
                        party.MilkMeat= dbParty[i].meatMilk; 
                        party.DateEvent= dbParty[i].dateEvent;                       
                        partys.push(party);
                    }
        
                    return partys;
                })
            }

    async AddGuest(personVM: People,partyType: Events): Promise<void> {
  
        let personUrl = this.baseUrl + '/people?tz=' + personVM.peopleId;
        
          let dbPeaples = await this.httpClient.get<DbPeople[]>(personUrl).toPromise();
          
          let dbGuest: DbGuest= new DbGuest();
        
          let dbPartisipation: DbPartisipation= new DbPartisipation();     
          
          if (dbPeaples.length > 0) {
              dbGuest.idPeapleTable= dbPeaples[0].id;
              dbGuest = await this.httpClient.post<DbGuest>(this.baseUrl + '/guest', dbGuest).toPromise();
              
          } else {
              let dbPeaple = new DbPeople();
              dbPeaple.name = personVM.name;
              dbPeaple.phone = personVM.phone;
              dbPeaple.mailAddress = personVM.mailAddress;
              dbPeaple.tz = personVM.peopleId;
              dbPeaple = await this.httpClient.post<DbPeople>(this.baseUrl + '/people', dbPeaple).toPromise();
              dbGuest.idPeapleTable = dbPeaple.id;            
              dbGuest = await this.httpClient.post<DbGuest>(this.baseUrl + '/guest', dbGuest).toPromise();

              dbPartisipation.idGuest= dbPeaple.id;               
              dbPartisipation.idParty= partyType.Id;
            
              dbPartisipation = await this.httpClient.post<DbPartisipation>(this.baseUrl + '/partisipation', dbPartisipation).toPromise();
          }
          this.currentGuestId = dbPartisipation.idGuest;
          this.currentPartyPartisipationId=dbPartisipation.idParty;
    }



    async AddInviter(personVM: People): Promise<void> {
        let personUrl = this.baseUrl + '/people?tz=' + personVM.peopleId;
      
        let dbPeaples = await this.httpClient.get<DbPeople[]>(personUrl).toPromise();
        let dbInviter: DbInviter= new DbInviter();
        if (dbPeaples.length > 0) {
            dbInviter.idPeapleTable = dbPeaples[0].id;
            dbInviter = await this.httpClient.post<DbInviter>(this.baseUrl + '/inviter', dbInviter).toPromise();
            
        } else {
            let dbPeaple = new DbPeople();
            dbPeaple.name = personVM.name;
            dbPeaple.phone = personVM.phone;
            dbPeaple.mailAddress = personVM.mailAddress;
            dbPeaple.tz = personVM.peopleId;
            dbPeaple = await this.httpClient.post<DbPeople>(this.baseUrl + '/people', dbPeaple).toPromise();
            dbInviter.idPeapleTable = dbPeaple.id;            
            dbInviter = await this.httpClient.post<DbInviter>(this.baseUrl + '/inviter', dbInviter).toPromise();
        }
        this.currentInviterId = dbInviter.id;
    }


    async AddEvent(eventM: Events): Promise<void> {
        let eventNameUrl = this.baseUrl + '/partys?name=' + eventM.Name;
        let eventPlaceUrl = this.baseUrl + '/partys?place=' + eventM.Place;
        let eventNumTakePartUrl = this.baseUrl + '/partys?numTackPart=' + eventM.NumTakePart;
        let eventDateUrl = this.baseUrl + '/partys?date=' + eventM.DateEvent;
        let eventMilkMeatUrl = this.baseUrl + '/partys?nameMeatMilk=' + eventM.MilkMeat;
        //let eventIdInviterUrl = 

        let dbEvName = await this.httpClient.get<DbEvents[]>(eventNameUrl).toPromise();
        let dbEvPlace = await this.httpClient.get<DbEvents[]>(eventPlaceUrl).toPromise();
        let dbEvNum = await this.httpClient.get<DbEvents[]>(eventNumTakePartUrl).toPromise();
        let dbEvDate = await this.httpClient.get<DbEvents[]>(eventDateUrl).toPromise();
        let dbEvMilkMeat = await this.httpClient.get<DbEvents[]>(eventMilkMeatUrl).toPromise();
       
        let dbEvent: DbEvents;
             
        dbEvent = new DbEvents();
        dbEvent.name = eventM.Name;
        dbEvent.dateEvent = eventM.DateEvent;
        dbEvent.numTackPart = eventM.NumTakePart;
        dbEvent.place = eventM.Place;
        dbEvent.meatMilk = eventM.MilkMeat;
        dbEvent.idInviter = eventM.IdInviter;
        dbEvent = await this.httpClient.post<DbEvents>(this.baseUrl + '/partys', dbEvent).toPromise();
        this.currentPartyId = dbEvent.id;

    }

    GetMealTypes():Observable<Sivug[]>{
        let url = this.baseUrl + "/sivug";
        return this.httpClient.get<Sivug[]>(url);        
    }

    GetParty():Observable<Events[]>{
        let url = this.baseUrl + "/partys";
      // let dbMana$ = this.httpClient.get<DbMana[]>(manaUrl);
        return this.httpClient.get<Events[]>(url);
        
    }

    GetMenuForChoose():Observable<Mana[]>{
       // let idPartyUrl = this.baseUrl + '/manot?idParty=' + newGuestView.idParty;
       // let idGuestUrl = this.baseUrl + '/manot?idGuest=' + newGuestView.idGuest;
        let url = this.baseUrl + "/manot";
      // let dbMana$ = this.httpClient.get<DbMana[]>(manaUrl);
        return this.httpClient.get<Mana[]>(url);
        
    }
   
    async AddManot(manot: Mana[]): Promise<void> {

        manot.forEach( async element => {
            let dbMana = new DbMana();
            dbMana.nameMana = element.name;
            dbMana.id = element.id;
            dbMana.idParty = element.idParty;
            dbMana.idSivog = element.idSivog;
            await this.httpClient.post<DbMana[]>(this.baseUrl + '/manot', dbMana).toPromise();
        });

       

    }
}