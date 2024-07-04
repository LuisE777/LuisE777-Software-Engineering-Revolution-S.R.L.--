import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService implements OnInit {

  private subject = new Subject<any>();

  nombreUsuario: string;
  //The initial name set into the Fileld Autocomplete service

  send() {
    this.subject.next();
  }

  getChange(): Observable<any> {
    return this.subject.asObservable();
  }
  constructor() { }

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem("nombre") + "";
  }
}
