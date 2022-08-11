import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { trigger, style, animate, transition } from '@angular/animations';
import {HttpClient, HttpParams} from '@angular/common/http';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({height:0, opacity:0}),
        animate(300, style({opacity:1})) 
      ]),
      transition(':leave', [
        animate(300, style({height:0, opacity:0})) 
      ])
    ])
  ]
})
export class AppComponent implements OnInit{
  rout : Router;
  login = false;
  logout = false;
  user: UserServiceService;
  constructor(router: Router, private http: HttpClient, userServ: UserServiceService){
    this.rout = router
    this.user = userServ;
  }

  logOut(): void{
    this.user.setUser("");
    this.logout = false;
    this.http.get<any>(
      "http://localhost:5000/logout", {withCredentials: true}
    ).subscribe({
      next:data=>{
        console.log(data);
      },
      error:error=>{
        console.log(error);
      }
    })
  }
  checkLogin(): void{
    this.http.get<any>(
      "http://localhost:5000/loggedIn",{withCredentials: true}
    ).subscribe({
      next:data=>{
        this.user.setUser(data.user);
        console.log(data);
      },
      error: error=>{
        console.log(error);
      }
    })
  }

  loginGoogle(): void{
    window.open('http://localhost:5000/google/login',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    let listener = window.addEventListener('message', (message) => {
      console.log(message.data)
      this.login = false;
      this.user.setUser(message.data.user)
      this.user.setType("google")
    });
  }

  ngOnInit(): void{
    this.checkLogin();
  }

  logUser(user: string, password: string): void{
    this.http.post<any>(
      "http://localhost:5000/local/login", {
        user:user,
        password: password
      }, {withCredentials: true}
    ).subscribe({
      next: data=>{
        this.user.setUser(data.user);
        this.login = false;
        console.log(data);
        if(window.location.href=="/saved_builds"){
          window.location.reload();
        }
      }, 
      error: error=>{
        console.log(error)
      }
    })
  }
  
}
