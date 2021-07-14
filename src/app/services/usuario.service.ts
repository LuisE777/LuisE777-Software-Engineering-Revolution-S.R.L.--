import { Facultad } from './../models/facultad.model';
import { Cotiz } from './../models/cotiz.model';
import { Empresa } from './../models/empresa.model';
import { Solicitud } from 'src/app/models/solicitud';
import { Unidades2 } from './../models/Unidad2.interfaz';
import { Cotizacion } from './../models/cotizacion.model';
import { Unidades } from './../models/unidades.model';
import { Roles } from './../models/roles.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from '../models/usuario.model'
import { timeout, catchError } from 'rxjs/operators';

//import { of } from 'rxjs/observable/of';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  //URL='http://127.0.0.1:8000/api/auth/register';
  URL_API_LOCAL='http://127.0.0.1:8000/api/auth';
  URL_API='http://apiser-vicios.herokuapp.com/api/auth';
  URL='http://apiser-vicios.herokuapp.com/api/auth/register';
  URL2='http://apiser-vicios.herokuapp.com/api/auth/roles';
  URL3='http://apiser-vicios.herokuapp.com/api/auth/unidades';
  URL4='http://apiser-vicios.herokuapp.com/api/auth/me?token=';
  URL5='http://apiser-vicios.herokuapp.com/api/auth/users';
  URL6='https://apiser-vicios.herokuapp.com/api/auth/solicituditems2';
  URL7='https://apiser-vicios.herokuapp.com/api/auth/unidades2';
  URL8='https://apiser-vicios.herokuapp.com/api/auth/solicitud3';
  URL9='https://apiser-vicios.herokuapp.com/api/auth/empresaCot';
  URL10='https://apiser-vicios.herokuapp.com/api/auth/empresasInfo';
  URL11='http://apiser-vicios.herokuapp.com/api/auth/empresas';
  URL12='https://apiser-vicios.herokuapp.com/api/auth/empresaCot';
  URL13='http://apiser-vicios.herokuapp.com/api/auth/empresaCot';
 // http://127.0.0.1:8000/api/auth/empresaCot/14 
  URL14='http://apiser-vicios.herokuapp.com/api/auth/cotizacion';
 // URL15='http://apiser-vicios.herokuapp.com/api/auth/empresas';
 URL15='http://apiser-vicios.herokuapp.com/api/auth/empresas';
  URL16='http://apiser-vicios.herokuapp.com/api/auth/empresas';
  URL17='http://apiser-vicios.herokuapp.com/api/auth/itemPresUni';
  URL18='http://apiser-vicios.herokuapp.com/api/auth/itemPresUniSum';
  URL19='http://apiser-vicios.herokuapp.com/api/auth/presupuesto';
  //
  URL20='http://apiser-vicios.herokuapp.com/api/auth/itemPresAnio1';
  URL21='http://apiser-vicios.herokuapp.com/api/auth/itemPresUni';
  URL22='http://apiser-vicios.herokuapp.com/api/auth/nombreEmp';
  //delete('itemPresUni/{id}'
    addUsuario(name:string, lastname:string,email:string,password:string,password_confirmation:string,cellphone:string,rol:string,unidaddegasto:string):Observable<any>{
      const obj =new FormData();
      obj.append("name",name);
      obj.append("lastname",lastname);
      obj.append("email",email);
      obj.append("password",password);
      obj.append("password_confirmation",password_confirmation);
      obj.append("cellphone",cellphone);
      obj.append("rol",rol);
      obj.append("unidaddegasto",unidaddegasto);
      return this.http.post(this.URL_API+"/register?token="+localStorage.getItem('token'),obj)
    }

    /**ACTUALIZAR URL CUANDO SE DEPLOYE EL BACKEND */
    editarUser(user: any){
      return this.http.put<any>('http://apiser-vicios.herokuapp.com/api/auth/actualizar'+"?token="+localStorage.getItem('token'),user);
    }

    getAllRoles():Observable<Roles[]>{
      return this.http.get<Roles[]>(this.URL_API+"/roles")
    }
    getAllRoles2():Observable<Roles[]>{
      return this.http.get<Roles[]>(this.URL_API+"/roles2")
    }
    getAllUnidades():Observable<Unidades[]>{
      return this.http.get<Unidades[]>(this.URL3)
    }
    getAllUser():Observable<Usuario[]>{
      return this.http.get<Usuario[]>(this.URL5)
    }

    getAllCotizaciones(valor:any):Observable<Cotizacion[]>{
      return this.http.get<Cotizacion[]>(this.URL6+"/"+valor)
    }
    //obtener info de una unidad
    getinfounidad(valor:any):Observable<Unidades[]>{
      return this.http.get<Unidades[]>(this.URL7+"/"+valor)
    }
    //obtener info de una solicitud
    getAllInfoSol(valor:any):Observable<Solicitud[]>{
      return this.http.get<Solicitud[]>(this.URL8+"/"+valor)
    }

    addEmpCot(id_solicitud:string, id_empresa:string):Observable<any>{
      const obj =new FormData();
      obj.append("id_solicitud",id_solicitud);
      obj.append("id_empresa",id_empresa);
      return this.http.post(this.URL9+"?token="+localStorage.getItem('token'),obj)
    }

    getAllInfoEmpresa(valor:any):Observable<Empresa[]>{
      return this.http.get<Empresa[]>(this.URL10+"/"+valor)
    }

    getAllEmpresas(): Observable<Empresa[]>{
      return this.http.get<Empresa[]>(this.URL11);
    }

    getEmpresaById(id): Observable<any>{
      return this.http.get<any>(this.URL11 + '/' + id);
    }
    //VERIFICAR SI EXISTE LA FACULTAD
    getExisteEmpresa(name): Observable<any>{
      return this.http.get<any[]>(this.URL_API_LOCAL+ '/verificarEmpresa' + '/' + name);
    }

    updateEmpresa(id, empresa): Observable<any>{
      return this.http.post<any>(this.URL11 + '/' + id+"?token="+localStorage.getItem('token'), empresa);
    }

    getAllEmpresasCot(): Observable<any>{
      return this.http.get<any[]>(this.URL12);
    }

    updateEmpresasCot(id, data): Observable<any>{
      return this.http.post<any[]>(this.URL13 + '/' + id+"?token="+localStorage.getItem('token'), data)
    }

    getIDCot(sol, emp): Observable<any>{
      return this.http.get<any[]>(this.URL14 + '/' + sol+ '/'+ emp);
    }
    addEmpresa(nombreemp:string, repnombre:string,diremp:string,nit:string,telefono:string,rubro:string,correo:string):Observable<any>{
      const obj =new FormData();
      obj.append("nombreemp",nombreemp);
      obj.append("repnombre",repnombre);
      obj.append("diremp",diremp);
      obj.append("nit",nit);
      obj.append("telefono",telefono);
      obj.append("rubro",rubro);
      obj.append("correo",correo);
      return this.http.post(this.URL15+"?token="+localStorage.getItem('token'),obj)
    }

    delete(id: string): Observable<any> {
      return this.http.delete<any>(this.URL16 + '/' + id+"?token="+localStorage.getItem('token'))
    }
    //obtener todo lo referente al presupuesto
    getPres1(unidad, anio): Observable<any>{
      return this.http.get<any[]>(this.URL17 + '/' + unidad+ '/'+ anio);
    }

    getPres2(unidad, anio): Observable<any>{
      return this.http.get<any[]>(this.URL18 + '/' + unidad+ '/'+ anio);
    }
    getPres3(unidad, anio): Observable<any>{
      return this.http.get<any[]>(this.URL19 + '/' + unidad+ '/'+ anio);
    }
    getPres4(unidad): Observable<any>{
      return this.http.get<any[]>(this.URL20 + '/' + unidad);
    }

    eliminarUsuario(id:string){
      return this.http.delete(this.URL_API_LOCAL+'/user/'+id+"?token="+localStorage.getItem('token'));
    }
    delete1(id: string): Observable<any> {
      return this.http.delete<any>(this.URL21 + '/' + id+"?token="+localStorage.getItem('token'))
    }
    getAllEmpresas1(id: string): Observable<any> {
      return this.http.get<any>(this.URL22 + '/' + id)
    }


    getExiste(name, lastName): Observable<any>{
      return this.http.get<any[]>(this.URL_API+ '/verificar' + '/' + name+ '/'+ lastName);
    }
    /////////////////////////////////////
    //Facultad
    //crear
    addFacultad(nombre:string, decano:string,correo:string,telefono:string,direccion:string):Observable<any>{
      const obj =new FormData();
      obj.append("nombre",nombre);
      obj.append("decano",decano);
      obj.append("correo",correo);
      obj.append("telefono",telefono);
      obj.append("direccion",direccion);
      return this.http.post(this.URL_API+"/facultad?token="+localStorage.getItem('token'),obj)
    }
    //eliminarFacultad
    deleteFacultad(id: string): Observable<any> {
      return this.http.delete<any>(this.URL_API + '/facultad/' + id+"?token="+localStorage.getItem('token'))
    }
    //obtener facultades
    getAllFacultad(): Observable<Facultad[]>{
      return this.http.get<Facultad[]>(this.URL_API+ '/facultades');
    }
    //VERIFICAR SI EXISTE LA FACULTAD
    getExisteFacultad(name): Observable<any>{
      return this.http.get<any[]>(this.URL_API+ '/verificarFacultad' + '/' + name);
    }
    //obtener info de una faacultad
    getfacultadById(id): Observable<any>{
      return this.http.get<any>(this.URL_API+'/facultadInfo' + '/' + id);
    }
    //actualizar facutlad
    updateFacultad(id:string,nombre:string, decano:string,correo:string,telefono:string,direccion:string): Observable<any>{
      const obj =new FormData();
      console.log(obj.forEach)
      obj.append("id",id);
      obj.append("nombre",nombre);
      obj.append("decano",decano);
      obj.append("telefono",telefono);
      obj.append("direccion",direccion);
      obj.append("correo",correo);
      console.log(obj)
      return this.http.post<any>(this.URL_API + '/facultadAct'+"?token="+localStorage.getItem('token'),obj);
    }
}
