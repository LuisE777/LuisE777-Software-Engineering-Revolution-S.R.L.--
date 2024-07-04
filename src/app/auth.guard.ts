import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: LoginService, private _router: Router){

  }

  canActivate(): boolean {
    if (this._authService.loggedIn()===true){
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }   
}

