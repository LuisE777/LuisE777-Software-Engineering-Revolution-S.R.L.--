import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent implements OnInit {

  token: string = "null";
  today = new Date();

  message: string;
  subscription: Subscription;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.loginService.currentMessage.subscribe(message => this.message = message);
  }

}
