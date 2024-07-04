import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-administrativos',
  templateUrl: './administrativos.component.html',
  styleUrls: ['./administrativos.component.css']
})
export class AdministrativosComponent implements OnInit {

  token: string = "null";
  today = new Date();

  message: string;
  subscription: Subscription;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.subscription = this.loginService.currentMessage.subscribe(message => this.message = message);
  }
}
