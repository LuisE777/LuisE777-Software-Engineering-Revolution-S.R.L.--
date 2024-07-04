import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/app/env';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  linkApi = environment.baseUrl;
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }
  URL_LOCAL='http://127.0.0.1:8000/api/auth/login';
  //URL='http://ser.tis.cs.umss.edu.bo/api.php/api/auth/login';
  //URL='http://apiser-vicios.herokuapp.com/api/auth/login';
  URL=this.linkApi+"/api/auth/login";
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
