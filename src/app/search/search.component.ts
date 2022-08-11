import { Component, Input, OnInit, Output } from '@angular/core';
import { Injectable, EventEmitter } from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map} from 'rxjs/operators';

@Injectable()

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() search_type = '';
  @Input() selected =  {title:"please select element", price:"", link: "", img: ""}
  @Output() selectedChange = new EventEmitter<any>();
  search = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  search_ary = [];

  setSearch() : void{
    this.search = !this.search;
  }

  setSelected(element: any): void{
    this.search = false;
    this.selected = element;
    this.selectedChange.emit(this.selected);
  }

  getSearchItems(search: string) {
    console.log(search)
    let options = new HttpParams().set('search', search);
    if(search!=""){
      options = options.append('type', this.search_type);
      this.http.get<any>("http://localhost:5000/products/getBoard",{
          params: options
        }
      ).subscribe({
        next: data=>{
          console.log(data);
          this.search_ary = data.rows;
          console.log(this.search_ary)
        },
        error: error =>{
          console.error("Error", error)
        }
      })
    }
    else{
      this.search_ary = [];
    }
  }
  
}
