
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ItemPresupuesto } from '../models/itemPresupuesto.model';
import { ItemSup } from '../models/itemSup.model';
import { environment } from 'src/app/env';
@Injectable({
  providedIn: 'root'
})
export class ItemPresService {
  linkApi = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }
  //http://127.0.0.1:8000/api/auth/items
  //http://apiser-vicios.herokuapp.com/api/auth
  //URL_API='http://apiser-vicios.herokuapp.com/api/auth/itemPres';
  URL_API=this.linkApi+'/api/auth/itemPres';
  //para guardar 
  addItemPres(unidad_id:string, itemsuperior_id:string,montoasig:string,periodo:string):Observable<any>{
    const obj =new FormData();
    obj.append("unidad_id",unidad_id);
    obj.append("itemsuperior_id",itemsuperior_id);
    obj.append("montoasig",montoasig);
    obj.append("periodo",periodo);
    return this.httpClient.post(this.URL_API+"?token="+localStorage.getItem('token'),obj)
  }
}

