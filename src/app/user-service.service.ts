import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
  user = '';
  type = 'local';

  getUser(): string{
    return this.user;
  }

  getType(): string{
    return this.type
  }
  
  setUser(user_in: string): void{
    this.user = user_in
  }

  setType(type_in: string): void{
    this.type = type_in
  }
}
