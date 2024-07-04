import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Unidad } from "../models/unidad.model";
import { environment } from 'src/app/env';
@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  linkApi = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  URL_API_local='http://127.0.0.1:8000/api/auth';
  URL_API=this.linkApi+'/api/auth';

  // Crear un unidad
  create(unidad: any): Observable<any> {
    return this.httpClient.post<any>( this.URL_API+ '/unidades'+"?token="+localStorage.getItem('token'), unidad)
    .pipe(
        catchError(this.errorHandler)
    );
  }

  // Encontrar por ID
  getById(id: string):  Observable<Unidad> {
    return this.httpClient.get<Unidad>(this.URL_API + '/unidades/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener todos los unidads
  getAll(): Observable<any> {
    return this.httpClient.get<any[]>(this.URL_API + '/unidades')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Editar unidad por su id
  update(id: any, unidad: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_API + '/unidades/' + id+"?token="+localStorage.getItem('token'), unidad)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Eliminar unidad por su id
  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.URL_API + '/unidades/' + id+"?token="+localStorage.getItem('token'))
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
    return this.httpClient.get<any[]>(this.URL_API + '/verificarUnidad' + '/' + name);
  }
}
