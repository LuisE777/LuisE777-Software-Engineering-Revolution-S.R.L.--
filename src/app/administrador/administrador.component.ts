import { Component } from '@angular/core';
import { Router } from "@angular/router"
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';
interface MenuItem {
  texto: string;
  ruta: string;
}
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: [
    "./administrador.component.css"
  ]
})
export class AdministradorComponent {
  token: string = "null";
  today = new Date();
  message: string;
  subscription: Subscription;
  constructor(private router: Router, private loginService: LoginService) { }
  ngOnInit(): void {
    this.subscription = this.loginService.currentMessage.subscribe(message => this.message = message);
  }
}
