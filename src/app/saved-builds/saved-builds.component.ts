import { Component, OnInit, Input} from '@angular/core';
import { UserServiceService } from '../user-service.service';
import {HttpClient, HttpParams} from '@angular/common/http'
import {Routes, RouterModule, Router} from '@angular/router'
import { BuildService } from '../build.service';
import { SavedCompComponent } from '../saved-comp/saved-comp.component';

@Component({
  selector: 'app-saved-builds',
  templateUrl: './saved-builds.component.html',
  styleUrls: ['./saved-builds.component.css']
})


export class SavedBuildsComponent implements OnInit {
  user: UserServiceService
  http: HttpClient
  bd: BuildService
  rt: Router
  loading = false;
  constructor(userServ: UserServiceService, http: HttpClient, bd: BuildService, rt: Router) { 
    this.user = userServ;
    this.http = http;
    this.bd = bd;
    this.rt = rt;
  }
  builds = [];

  ngOnInit(): void {  
      this.http.get<any>('http://localhost:5000/user/saved', {withCredentials: true}).subscribe({
        next: data=>{
          console.log(data);
          this.builds = data.builds;
        },
        error: error =>{
          console.error("Error", error)
        }
      })
  }

  editBuild(build: any): void{
    this.bd.setCurrent();
    this.bd.setBuild(build)
    this.rt.navigate(['/build'])
  }

  deleteBuild(build:any): void{
    this.http.post<any>('http://localhost:5000/user/deleteBuild',{
      user: build.user, name: build.name}, {withCredentials: true}).subscribe({
      next: data=>{
        console.log(data);
      },
      error: error =>{
        console.error("Error", error)
      }
    })
    this.loading = true;
    setTimeout(async() => {
      this.loading = false;
      this.ngOnInit();
    }, 2000)
  }

  calcTotal(build:any): string{
    return (parseFloat(build['pcb']['price'].slice(1)) * build['switchCount'] + parseFloat(build['plate']['price'].slice(1))+ 
    parseFloat(build['case']['price'].slice(1))+ parseFloat(build['keycaps']['price'].slice(1)) + parseFloat(build['misc']['price'].slice(1)) + parseFloat(build['switches']['price'].slice(1))).toFixed(2)
  }
}
