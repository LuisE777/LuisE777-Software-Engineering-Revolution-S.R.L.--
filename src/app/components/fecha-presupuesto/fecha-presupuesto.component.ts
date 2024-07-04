import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { FechaService } from 'src/app/services/fecha.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fecha-presupuesto',
  templateUrl: './fecha-presupuesto.component.html',
  styleUrls: ['./fecha-presupuesto.component.css']
})
export class FechaPresupuestoComponent implements OnInit {

  today = new Date();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(public fechaService: FechaService, private router: Router) { }

  ngOnInit(): void {

    this.fechaService.obtenerUltimaFecha().subscribe(
      res => {
        console.log(res);
        this.fechaService.fecha = res;
      },
      err => console.log(err)
    )
  }

  guardar() {
    this.range.controls['start'].markAsTouched;
    this.range.controls['end'].markAsTouched;
    if (this.range.controls['start'].invalid || this.range.controls['start'].value === null ||
      this.range.controls['end'].invalid || this.range.controls['end'].value === null || !this.verificarFechaPasada()

    ) {
      this.range.markAsDirty;
      Swal.fire('Verifique los campos!', '', 'error');
      return;
    } else {
      console.log(this.toMysqlFormat(this.range.controls['start'].value));
      console.log(this.toMysqlFormat(this.range.controls['end'].value));
      let fecha = {
        apertura: this.toMysqlFormat(this.range.controls['start'].value),
        cierre: this.toMysqlFormat(this.range.controls['end'].value),
      }
      if (fecha != null) {
        this.fechaService.crearFecha(fecha).subscribe(
          res => {
            console.log(res)
            Swal.fire('Fecha Guardada!!', '', 'success');
            this.router.navigate(['/tablero']);
          }
          , err => console.log(err)
        );
      } else {
        Swal.fire('Verifique los campos!', '', 'error');
      }
    }

  }

  toMysqlFormat(fecha: any) {
    return fecha.toISOString().slice(0, 19).replace('T', ' ');
  }

  actual() {
    if (this.fechaService.fecha) {
      return this.fechaService.fecha.apertura + ' al ' + this.fechaService.fecha.cierre;
    } return "No se selecciono ninguna fecha";
  }

  verificarFechaPasada() {
    return !(this.range.controls['start'].value.setHours(0, 0, 0, 0) < this.today.setHours(0, 0, 0, 0));
  }
  obtenerFechas() {
    this.fechaService.obtenerFecha().subscribe(
      res => {
        console.log(res);
        this.fechaService.fechas = res;
      },
      err => console.log(err)
    )
  }
}
