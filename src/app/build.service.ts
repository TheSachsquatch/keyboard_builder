import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

  constructor() { }
  def = {title:"please select element", price:"$0", link: "", img: ""}
  build = {name: "new keyboard", switches: this.def, pcb: this.def, case: this.def, keycaps: this.def, misc: this.def, plate:this.def};
  switchCount = 1;
  isCurrent = false;

  setCurrent(): void{
    this.isCurrent = !this.isCurrent;
  }

  getCurrent(): boolean{
    return this.isCurrent;
  }

  getBuild(): {name: string;
    switches: {
        title: string;
        price: string;
        link: string;
        img: string;
    };
    pcb: {
        title: string;
        price: string;
        link: string;
        img: string;
    };
    case: {
        title: string;
        price: string;
        link: string;
        img: string;
    };
    keycaps: {
        title: string;
        price: string;
        link: string;
        img: string;
    };
    misc: {
        title: string;
        price: string;
        link: string;
        img: string;
    }; 
   plate:{
    title: string;
    price: string;
    link: string;
    img: string;
   }} {
    return this.build;
  }

  setBuild(build: any): void{
    this.build = build;
  }

  setSwitchCount(num_in: number): void{
    this.switchCount = num_in;
  }

}
