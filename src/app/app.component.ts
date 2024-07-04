import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SistemaDeApoyoParaCotizaciones';
  token:string = "null";
  today = new Date();

  message:string;
  subscription: Subscription;

  constructor (private router: Router, private loginService: LoginService){}

  /*ngOnInit(): void {     
    this.verificarToken();
    this.subscription = this.loginService.currentMessage.subscribe(message => this.message = message);
  }*/

  /*verificarToken(){
    this.token = localStorage.getItem("token")+""; 
    let d = new Date(0);
    //console.log(atob(this.token.split('.')[1]));

    if(this.token != "null"){
      try {
        var exp = JSON.parse(atob(this.token.split('.')[1])).exp;
        //console.log(exp);
        // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(exp);
        //console.log("d",d);
      } catch (error) {
       console.log(error) ;
      }      
    }      
    if(this.token == "null" || d < this.today){
      this.loginService.changeMessage("Su cuenta se cerro por que la sesión expiro.")
      console.log("Token no encontrado o expirado");
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
      console.log("token encontrado y valido");
    }
  }*/
}
