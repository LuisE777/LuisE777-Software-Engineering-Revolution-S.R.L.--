import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Presupuesto } from '../models/presupuesto';
import { environment } from 'src/app/env';
@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  linkApi = environment.baseUrl;
  presupuesto: Presupuesto[];
  todos: any[];
  presupuestos: any[];
  idActual: string;

  URL_API_LOCAL = 'http://127.0.0.1:8000/api/auth';
  URL_API = this.linkApi + '/api/auth';

  constructor(private http: HttpClient) { }

  obtenerPresupuesto(id: any, gestion: any) {
    //return this.http.get<Presupuesto[]>('http://127.0.0.1:8000/api/auth/presupuesto/'+id+'/'+gestion);
    return this.http.get<Presupuesto[]>(this.URL_API + '/presupuesto/' + id + '/' + gestion);
  }

  actualizarPresupuesto(presupuesto: any) {
    presupuesto.id = this.idActual;
    //return this.http.put('http://127.0.0.1:8000/api/auth/presupuesto/', presupuesto);
    return this.http.put(this.URL_API + '/presupuesto' + "?token=" + localStorage.getItem('token'), presupuesto);
  }

  obtenerDatos() {
    //return this.http.get<any[]>('http://127.0.0.1:8000/api/auth/presupuestos/');
    return this.http.get<any[]>(this.URL_API + '/presupuestos');
  }

  getAll() {
    return this.http.get<any[]>(this.URL_API + '/presupuesto');
  }

  update(presupuesto: any) {
    return this.http.put(this.URL_API + '/presupuesto' + "?token=" + localStorage.getItem('token'), presupuesto);
  }

  eliminarPresupuesto(id: string) {
    return this.http.delete(this.URL_API + '/presupuesto/' + id + "?token=" + localStorage.getItem('token'));
  }
}
