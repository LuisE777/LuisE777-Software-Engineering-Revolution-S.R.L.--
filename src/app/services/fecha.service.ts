import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fecha } from '../models/fecha';
import { Presupuesto } from '../models/presupuesto';
import { environment } from 'src/app/env';
@Injectable({
  providedIn: 'root'
})
export class FechaService {
  linkApi = environment.baseUrl;
  fechas:Fecha[] = [];
  fecha:Fecha;
  URL_API_LOCAL='http://127.0.0.1:8000/api/auth';
  URL_API=this.linkApi+'/api/auth';

  constructor(private http: HttpClient) { }

  crearFecha(fecha: any) {
    return this.http.post<any>(this.URL_API + '/fechas'+"?token="+localStorage.getItem('token'),fecha);
  }

  obtenerFecha(){
    //return this.http.get<Fecha[]>('http://127.0.0.1:8000/api/auth/fechas');
    return this.http.get<Fecha[]>(this.URL_API+'/fechas');
  }

  obtenerUltimaFecha(){
    return this.http.get<Fecha>(this.URL_API + '/ultimafecha');
  }

  crearPresupuesto(presupuesto: any){
    return this.http.post<any>(this.URL_API+'/presupuesto'+"?token="+localStorage.getItem('token'), presupuesto);
  }

  obtenerPresupuestos(){
    return this.http.get<Presupuesto[]>(this.URL_API+'/presupuesto');
  }

}
