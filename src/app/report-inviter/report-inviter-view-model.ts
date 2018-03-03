
import { Events } from "../model/events";
export class ReportInviterViewModel{
    public tz:string;
    public events:Events[];
    public currentEvent:Events;
    public GuestsForCurrentEvent:GuestAndManaViewModel[];
}

export class GuestAndManaViewModel{
    public poepleName:string;
    public nameMana:string;
}