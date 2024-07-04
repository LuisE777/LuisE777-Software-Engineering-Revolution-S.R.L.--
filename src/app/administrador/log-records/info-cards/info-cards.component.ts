import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Stats } from 'src/app/models/log.model';
import { environment } from '../../../env';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.css']
})
export class InfoCardsComponent implements OnInit {

  //URL_api: string = 'http://apiser-vicios.herokuapp.com';
  //URL_api: string = 'http://127.0.0.1:8000';
  URL_api =  environment.baseUrl;

  constructor(private http: HttpClient) { }

  datalogs:Stats;
  ngOnInit(): void {
    this.getLogs();
  }

  async getLogs() { 
    const res: any = await this.http
    .get<Stats>(this.URL_api+'/api/auth/stats')
    .toPromise();
    this.datalogs = res; 
    //console.log("Los datos",this.datalogs);     

  } 

}
