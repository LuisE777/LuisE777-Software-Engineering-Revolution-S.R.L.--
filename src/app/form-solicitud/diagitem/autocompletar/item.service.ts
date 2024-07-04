import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import {NoticeallService} from '../noticeall.service';
import { environment } from 'src/app/env';

@Injectable({
    providedIn: 'root'
})

//Recovered fileds [Nombre item, cantidad, Descripcion, precio unitario]
export class Service {
    constructor(private http: HttpClient, private getIdSuperior: NoticeallService) { } 
    URL_api = environment.baseUrl;   
    //LinkById:string=  this.getIdSuperior.itemGeneral;
    opts = []; 
    //link:string=this.getIdSuperior.itemGeneral.toString();

    getData() {        
        //console.log('LLAMADA A LA AIIII');
        //console.log('NUMEROOOOO',this.getIdSuperior.itemGeneral);
        //Setiing it empty to get the new Superior Item selected items
        this.opts=[];
        return this.opts.length ?
            of(this.opts) :
            this.http.get<any>(this.URL_api+'/api/auth/itemSupItems/'+this.getIdSuperior.itemGeneral).pipe(tap(data => this.opts = data));

    } 

}
