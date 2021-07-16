import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  
  constructor(private http: HttpClient) { }
  URL_LOCAL='http://127.0.0.1:8000/api/auth/login';
  URL='https://apiser-vicios.herokuapp.com/api/auth/login';
  loginUsuario(email:string,password:string):Observable<any>{
    const obj = new FormData();
    obj.append("email",email);
    obj.append("password",password);
    return this.http.post(this.URL,obj)
  } 
  
  loggedIn(){
    //En vez este att obtener el TOKEN
    return !!localStorage.getItem('token');
  }
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

}


////////////////////////

/*

    addUsuario(name:string, lastname:string,email:string,password:string,password_confirmation
      :string,cellphone:string,rol:string):Observable<any>{
      const obj =new FormData();
      obj.append("name",name);
      obj.append("lastname",lastname);
      obj.append("email",email);
      obj.append("password",password);
      obj.append("password_confirmation",password_confirmation);
      obj.append("cellphone",cellphone);
      obj.append("rol",rol);
      return this.http.post(this.URL,obj)
    }

    */
