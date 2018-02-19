export class Events{
    
    private id : number
    public get Id() : number {
        return this.id;
    }
    public set Id(v : number) {
        this.id = v;
    }
    private idInviter : number
    public get IdInviter() : number {
        return this.idInviter;
    }
    public set IdInviter(v : number) {
        this.idInviter = v;
    }

    private name : string;
    public get Name() : string {
        return this.name;
    }
    public set Name(v : string) {
        this.name = v;
    }
 
 
    private place : string;
    public get Place() : string {
        return this.place;
    }
    public set Place(v : string) {
        this.name = v;
    }
    
    private numTakePart : number;
    public get NumTakePart() : number {
        return this.numTakePart;
    }
    public set NumTakePart(v : number) {
        this.numTakePart = v;
    }
 
    private dateEvent: Date;
    public get DateEvent() : Date {
        return this.dateEvent;
    }
    public set DateEvent(v : Date) {
        this.dateEvent = v;
    }
 
    private milkMeat:string;
    public get MilkMeat() : string {
        return this.milkMeat;
    }
    public set MilkMeat(v : string) {
        this.milkMeat = v;
    }
 }