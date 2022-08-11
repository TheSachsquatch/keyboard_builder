import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved-comp',
  templateUrl: './saved-comp.component.html',
  styleUrls: ['./saved-comp.component.css']
})
export class SavedCompComponent implements OnInit {
  def = {title:"please select element", price:"$0", link: "", img: ""}
  @Input() build = {name: "new keyboard", switches: this.def, pcb: this.def, case: this.def, keycaps: this.def, misc: this.def, plate:this.def};
  @Input() type : 'plate' | 'switches' | 'pcb' | 'case' | 'keycaps' | 'misc' ;
  constructor() { 
    this.type= 'plate';
  }

  ngOnInit(): void {
  }

}
