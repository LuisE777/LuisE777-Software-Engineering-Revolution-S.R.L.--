import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Rol } from '../models/rol.model'
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/app/env';
@Injectable({
  providedIn: 'root'
})
export class RolService {
  linkApi = environment.baseUrl;
  constructor(private http: HttpClient) { }
  roles:Rol[] = [];
  URL_API_LOCAL='http://127.0.0.1:8000/api/auth';
  URL_API=this.linkApi+'/api/auth';

  obtenerRoles(){
    return this.http.get<Rol[]>(this.URL_API+ '/roles');
  }

  crearRol(rol: any) {
    return this.http.post<any>(this.URL_API + '/roles'+"?token="+localStorage.getItem('token'),rol);
  }

  /**ACTUALIZAR URL CUANDO SE DEPLOYE EL BACKEND */
  editarRol(rol: any){
    console.log("ROL EDITADO ", rol);
    //return this.http.put<any>('http://apiser-vicios.herokuapp.com/api/auth/roles'+"?token="+localStorage.getItem('token'),rol);
    return this.http.put<any>(this.URL_API +'/roles'+"?token="+localStorage.getItem('token'),rol);
  }

  getPrivilegios(nomrol: any){
    let rol={
      rolnom: nomrol
    }
    //return this.http.get<any>(this.URL_API_LOCAL + '/rol-privilegios'+"?token="+localStorage.getItem('token'),rol);
    return this.http.get<any>(this.URL_API + '/rol-privilegios'+"/"+nomrol);
  }

  /*eliminarRol(rol: any){
    console.log(rol);
    return this.http.delete<any>('http://127.0.0.1:8000/api/auth/roles',rol);
  }*/

  eliminarRol(id: string): Observable<any> {
    return this.http.delete<any>(this.URL_API + '/roles/' + id+"?token="+localStorage.getItem('token'))
    .pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.error.message;
    }
    console.log("error del servicio");
    return throwError(errorMessage);
  }
  getExiste(name): Observable<any>{
    return this.http.get<any[]>(this.URL_API+ '/rolesVerificar' + '/' + name);
  }

}