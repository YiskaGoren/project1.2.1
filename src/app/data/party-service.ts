import { Injectable } from "@angular/core/";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { guest } from '../model/guest';
import { Inviter } from '../model/inviter';
import { Mana } from '../model/mana';
import { Sivug } from '../model/sivug';
import { DbGuest } from '../../db/dbGuest';
import { DbInviter } from '../../db/dbInviter';
import { DbMana } from '../../db/dbMana';
import 'rxjs/add/operator/combineLatest';
import { GuestViewModel } from "../person/guest-view-model";
import { InviterViewModel } from '../inveiter/inviter-view-model';
import {MenuViewModel } from '../menu/menu-view-model'
import { Events } from "../model/events";
import { DbEvents } from "../../db/dbEvents";
 

@Injectable()
export class PartyService {
    constructor(private httpClient: HttpClient) { }

    baseUrl: string = 'http://localhost:3000';

    getGest(): Observable<guest[]> {
// מהserverהפונקציה מחזירה את טבלת מוזמנים
        let guestsUrl = this.baseUrl + '/guest1';
        let dbGuests$ = this.httpClient.get<DbGuest[]>(guestsUrl);

      return dbGuests$.combineLatest(dbGuests$, (dbGuest) => {
            let guests: guest[] = [];

            for (let i = 0; i < dbGuest.length; i++) {
                let guest1 = new guest((dbGuest[i].guestId).toString(),dbGuest[i].name,dbGuest[i].mailAddress,dbGuest[i].Phone,dbGuest[i].idParty);

                guests.push(guest1);
            }

            return guests;
        })
    }
    getInviter(): Observable<Inviter[]> {
        // מהserverהפונקציה מחזירה את טבלת מוזמנים
                let inviterUrl = this.baseUrl + '/inviter';
                let dbInviters$ = this.httpClient.get<DbInviter[]>(inviterUrl);
        
              return dbInviters$.combineLatest(dbInviters$, (dbInviter) => {
                    let inviters: Inviter[] = [];
        
                    for (let i = 0; i < DbInviter.length; i++) {
                        let inviter = new Inviter((dbInviter[i].inviterId).toString(),dbInviter[i].name,dbInviter[i].mailAddress,dbInviter[i].Phone);
        
                        inviters.push(inviter);
                    }
        
                    return inviters;
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
                        mana.idmana = dbMana[i].id;
                        mana.idSivog = dbMana[i].idSivog;
                        mana.nameMana = dbMana[i].nameMana;
                        mana.idInviter = dbMana[i].idInviter;        
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

    async AddGuest(personVM: GuestViewModel): Promise<void> {
        let personUrl = this.baseUrl + '/guest1?name=' + personVM.name;
        let personUrl2 = this.baseUrl + '/guest1?Phone=' + personVM.phone;
        let personUrl3 = this.baseUrl + '/guest1?idperson=' + personVM.idperson;
        let personUrl4 = this.baseUrl + '/guest1?mailAdress=' + personVM.mailAdress;
        let personUrl5 = this.baseUrl + '/guest1?mailAdress=' + personVM.idParty;

        let dbGuests = await this.httpClient.get<DbGuest[]>(personUrl).toPromise();
        let dbGuests2 = await this.httpClient.get<DbGuest[]>(personUrl2).toPromise();
        let dbGuests3 = await this.httpClient.get<DbGuest[]>(personUrl3).toPromise();
        let dbGuests4 = await this.httpClient.get<DbGuest[]>(personUrl4).toPromise();
        let dbGuests5 = await this.httpClient.get<DbGuest[]>(personUrl5).toPromise();

        let dbGuest: DbGuest;
        if (dbGuests.length > 0) {
            dbGuest = dbGuests[0];
        } else {
            dbGuest = new DbGuest();
            dbGuest.name = personVM.name;
            dbGuest.Phone = personVM.phone;
            dbGuest.guestId = personVM.idperson;
            dbGuest.mailAddress = personVM.mailAdress;
            dbGuest.idParty = personVM.idParty;
            dbGuest = await this.httpClient.post<DbGuest>(this.baseUrl + '/guest1', dbGuest).toPromise();
        }

    }
    async AddInviter(personVM: InviterViewModel): Promise<void> {
        let personUrl = this.baseUrl + '/inviter?name=' + personVM.name;
        let personUrl2 = this.baseUrl + '/inviter?Phone=' + personVM.phone;
        let personUrl3 = this.baseUrl + '/inviter?id=' + personVM.id;
        let personUrl4 = this.baseUrl + '/inviter?mailAdress=' + personVM.mailAdress;

        let dbInviters = await this.httpClient.get<DbInviter[]>(personUrl).toPromise();
        let dbInviters2 = await this.httpClient.get<DbInviter[]>(personUrl2).toPromise();
        let dbInviters3 = await this.httpClient.get<DbInviter[]>(personUrl3).toPromise();
        let dbInviters4 = await this.httpClient.get<DbInviter[]>(personUrl4).toPromise();
        let dbInviter: DbInviter;
        if (dbInviters.length > 0) {
            dbInviter = dbInviters[0];
        } else {
            dbInviter = new DbInviter();
            dbInviter.name = personVM.name;
            dbInviter.Phone = personVM.phone;
            dbInviter.inviterId = personVM.id;
            dbInviter.mailAddress = personVM.mailAdress;
            dbInviter = await this.httpClient.post<DbInviter>(this.baseUrl + '/inviter', dbInviter).toPromise();
        }

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
      
       {
            dbEvent = new DbEvents();
            dbEvent.name = eventM.Name;
            dbEvent.dateEvent = eventM.DateEvent;
            dbEvent.numTackPart = eventM.NumTakePart;
            dbEvent.place = eventM.Place;
            dbEvent.meatMilk = eventM.MilkMeat;
            dbEvent = await this.httpClient.post<DbEvents>(this.baseUrl + '/partys', dbEvent).toPromise();
        }

    }

    GetMealTypes():Observable<Sivug[]>{
        let url = this.baseUrl + "/sivug";
      // let dbMana$ = this.httpClient.get<DbMana[]>(manaUrl);
        return this.httpClient.get<Sivug[]>(url);
         
    }

    GetParty():Observable<Events[]>{
        let url = this.baseUrl + "/partys";
      // let dbMana$ = this.httpClient.get<DbMana[]>(manaUrl);
        return this.httpClient.get<Events[]>(url);
         
    }


    async AddMana(menuVM: Mana): Promise<void> {
        let dbMana = new DbMana();
        dbMana.nameMana = menuVM.nameMana;
        dbMana.id = menuVM.idmana;
        dbMana.idInviter = menuVM.idInviter;
        dbMana.idSivog = menuVM.idSivog;
        await this.httpClient.post<DbInviter>(this.baseUrl + '/manot', dbMana).toPromise();
    }
}