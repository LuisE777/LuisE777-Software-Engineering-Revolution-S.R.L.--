import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { NavbarService } from './navbar.service';
import { LoginService } from '../services/login.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dolares = new FormControl('', [Validators.min(0), Validators.pattern("^[\.a-zA-Z0-9,!? ]*$")]);
  modal = {
    titulo: 'Dolares a bolivianos',
    label: 'Dolares $',
    valor: 0,
    tasa: "1 Dolar equivale a 6.96 bolivianos"
  }
  flag: boolean = true;

  constructor(private router: Router, private AuthLog: LoginService) {
    this.dolares.setValue(0);
  }
  nameUser: string;

  ngOnInit(): void {
    this.nameUser = localStorage.getItem("nombre") + "";

  }
  cerrar() {

    this.cerrando();
  }
  cerrando() {

    Swal.fire({
      title: '¿Cerrar Sesión?',
      showDenyButton: true,
      position: 'center',
      padding: '5em',
      confirmButtonText: `Aceptar`,
      confirmButtonColor: `#003975`,
      denyButtonText: `Cancelar`,
    }).then((result) => {      
      if (result.isConfirmed) {        

        localStorage.clear();
        this.router.navigate(['/login']);

      } else if (result.isDenied) {

      }
    })
  }

  recargar() {
    window.location.reload()
  }

  cambiarTitulos() {
    if (this.flag) {
      this.modal.titulo = "Dolares a bolivianos";
      this.modal.tasa = "1 Dolar equivale a 6.96 bolivianos";
      this.modal.label = "Dolares $"
    } else {
      this.modal.titulo = "Bolivianos a dolares";
      this.modal.tasa = "1 Boliviano equivale a " + (1 / 6.96).toFixed(2) + " dolares";
      this.modal.label = "Bolivianos Bs."
    }
  }

  cambiar() {
    this.flag = !this.flag;
    this.cambiarTitulos();
  }

  valorConvertido() {
    if (this.dolares.invalid) {
      return 0;
    } else {
      if (this.flag) {
        return (this.dolares.value * 6.96).toFixed(2) + ' Bs.';
      } else {
        return (this.dolares.value / 6.96).toFixed(2) + ' $';
      }
    }
  }

  getErrorMessage() {
    if (this.dolares.hasError('min')) {
      return 'Solo se admite numeros positivos'
    } else {
      return "Solo se admiten numeros";
    }
  }

}
