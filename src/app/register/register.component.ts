import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  @Input() login = false;
  @Output() loginChange = new EventEmitter<boolean>();

  user = "";
  signedUp = false;
  userExists = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  signup(email: string, user: string, password: string): void {
    this.http.post<any>("http://localhost:5000/local/register", {
      email: email,
      password: password,
      user: user
    }).subscribe({
      next: data =>{
        if(data.message== "Signup successful"){
          console.log("success");
          this.signedUp = true;
          this.user = data.user;
        }
        else{
          this.userExists = true;
        }
      },
      error: err=>{
        console.log(err);
      }
    })
  }
}
