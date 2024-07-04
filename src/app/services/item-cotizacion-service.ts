import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCoti } from '../models/itemCoti.model';

@Injectable({
  providedIn: 'root'
})
export class ItemCotizacionService {

  URL_API='http://apiser-vicios.herokuapp.com/api/auth';
  // URL_API='http://127.0.0.1:8000/api/auth';
  URL_API2='http://apiser-vicios.herokuapp.com/api/auth/scan_cotizacion';
  // URL_API3='http://127.0.0.1:8000/api/auth/scan_cotizacion';

  constructor(private http: HttpClient) { }

  create(itemCoti: any): Observable<any> {
    return this.http.post(this.URL_API + '/item_cotizacion', itemCoti);
  }

  getAll(): Observable<ItemCoti> {
    return this.http.get<ItemCoti>(this.URL_API + '/item_cotizacion');
  }

  getByEmpresaCot(id: string): Observable<ItemCoti> {
    return this.http.get<ItemCoti>(this.URL_API + '/item_cotizacion' + id);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.URL_API + '/item_cotizacion/' + id);
  }

  // getUploads(): Observable<any> {
  //   return this.http.get(this.URL_API2);
  // }

  // deleteFile(fileid: string){
  //   return this.http.delete(this.URL_API2 + '/' + fileid)
  // }

  subirArchivo(datos: any): Observable<any> {
    return this.http.post<any>(this.URL_API2, datos);
  }
}
