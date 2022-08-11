import { Component, OnInit, Input } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import { BuildService } from '../build.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-build-tab',
  templateUrl: './build-tab.component.html',
  styleUrls: ['./build-tab.component.css']
})
export class BuildTabComponent implements OnInit {
  def = {title:"please select element", price:"$0", link: "", img: ""}
  build = {name: "new keyboard", switches: this.def, pcb: this.def, case: this.def, keycaps: this.def, misc: this.def, plate: this.def};
  @Input() currentBuild = false;
  editName= false;
  oldName = this.build.name;
  name = this.build.name;
  user: UserServiceService;
  http: HttpClient;
  num_switch=1;
  switchSelected = this.build.switches
  pcbSelected = this.build.pcb
  caseSelected = this.build.case
  keycapsSelected = this.build.keycaps
  plateSelected = this.build.plate
  miscSelected = this.build.misc
  message = "";
  overwritePrompt = false;
  loading = false;
  rt: ActivatedRoute;
  bdServ: BuildService;
  current =false;

  setProps(): void{
    this.switchSelected = this.build.switches
    this.pcbSelected = this.build.pcb
    this.caseSelected = this.build.case
    this.keycapsSelected = this.build.keycaps
    this.miscSelected = this.build.misc
    this.name = this.build.name;
  }

  constructor(userServ: UserServiceService, httpClient: HttpClient, rt: ActivatedRoute, bdServ: BuildService) { 
    this.user = userServ;
    this.http = httpClient;
    this.rt = rt;
    this.bdServ = bdServ;
    this.build= bdServ.getBuild();
    this.current = bdServ.getCurrent();
    this.oldName = this.build.name;
    this.num_switch =this.bdServ.switchCount;
    this.setProps();
  }

  setName(name_in: string,): void{
    this.name = name_in;
    this.editName = false;
  }

  setNum(event: any): void{
    this.num_switch = event.target.value;
    this.bdServ.setSwitchCount(event.target.value);
  }

  stopEdit(): void{
    this.build = {name: "new keyboard", switches: this.def, pcb: this.def, case: this.def, keycaps: this.def, misc: this.def, plate: this.def};
    this.bdServ.setCurrent();
    this.bdServ.setBuild(this.build);
    this.setProps();
    this.current = false;
    this.oldName = this.build.name;
  }
  
  saveBuild(): void{
    if(this.current){
      console.log(this.current);
      this.editBuild();
    }
    else{
      this.http.post<any>(`http://localhost:5000/user/addBuild`,{
      body: [this.user.getUser(), JSON.stringify(this.caseSelected), 
        JSON.stringify(this.keycapsSelected), JSON.stringify(this.pcbSelected), JSON.stringify(this.miscSelected), JSON.stringify(this.switchSelected), this.name, JSON.stringify(this.plateSelected), this.num_switch]
      }, {withCredentials: true}).subscribe({
        next: data =>{
          console.log(data);
          if(data.message== "a build with this name already exists, would you like to overwrite?"){
            this.overwritePrompt = true;
          }
          else{
            this.loading = true;
            setTimeout(()=>{
              this.loading= false;
              this.message = data.message;
              console.log(data.message);
              setTimeout(()=>{
                this.message = ""
              }, 1500)
            }, 1000)
          }
        },
        error: err=>{
          console.log(err);
        }
      })
    }
  }

  editBuild(): void{
    this.http.post<any>(`http://localhost:5000/user/editBuild`,{
      body: [this.user.getUser(), JSON.stringify(this.caseSelected), 
        JSON.stringify(this.keycapsSelected), JSON.stringify(this.pcbSelected), JSON.stringify(this.miscSelected), JSON.stringify(this.switchSelected), this.name, JSON.stringify(this.plateSelected), this.num_switch]
    }, {withCredentials: true}).subscribe({
      next: data =>{
        this.overwritePrompt = false;
        this.loading = true;
        setTimeout(()=>{
          this.loading= false;
          this.message = data.message;
          console.log(data.message);
          setTimeout(()=>{
            this.message = ""
          }, 1500)
        }, 1000)
        
      },
      error: err=>{
        console.log(err);
      }
    })
  }

  ngOnInit(): void {

  }


  calculateTotal(): string{
    return (parseFloat(this.switchSelected.price.slice(1))*this.num_switch +parseFloat(this.pcbSelected.price.slice(1))+parseFloat(this.caseSelected.price.slice(1))+parseFloat(this.keycapsSelected.price.slice(1))+parseFloat(this.miscSelected.price.slice(1))
    +parseFloat(this.plateSelected.price.slice(1))).toFixed(2);
  }
}
