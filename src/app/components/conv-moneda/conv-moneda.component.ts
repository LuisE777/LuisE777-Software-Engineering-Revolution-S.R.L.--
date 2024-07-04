import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-conv-moneda',
  templateUrl: './conv-moneda.component.html',
  styleUrls: ['./conv-moneda.component.css']
})
export class ConvMonedaComponent implements OnInit {

  dolares = new FormControl('', [Validators.min(0), Validators.pattern("^[\.a-zA-Z0-9,!? ]*$")]);
  modal = {
    titulo: 'Dolares a bolivianos',
    label: 'Dolares',
    valor: 0,
    tasa: "1 Dolar equivale a 6.96 bolivianos"
  }

  flag: boolean = true;
  constructor() {
    this.dolares.setValue(0);
  }

  ngOnInit(): void {
  }

  cambiarTitulos() {
    if (this.flag) {
      this.modal.titulo = "Dolares a bolivianos";
      this.modal.tasa = "1 Dolar equivale a 6.96 bolivianos";
      this.modal.label = "Dolares"
    } else {
      this.modal.titulo = "Bolivianos a dolares";
      this.modal.tasa = "1 Boliviano equivale a " + (1 / 6.96).toFixed(2) + " dolares";
      this.modal.label = "Bolivianos"
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
