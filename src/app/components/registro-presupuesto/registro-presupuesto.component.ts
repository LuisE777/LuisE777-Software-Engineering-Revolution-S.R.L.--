import { constructorParametersDownlevelTransform } from '@angular/compiler-cli';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Presupuesto } from 'src/app/models/presupuesto';
import { Unidad } from 'src/app/models/unidad.model';
import { FechaService } from 'src/app/services/fecha.service';
import { MonedaService } from 'src/app/services/moneda.service';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
import { UnidadService } from 'src/app/services/unidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-presupuesto',
  templateUrl: './registro-presupuesto.component.html',
  styleUrls: ['./registro-presupuesto.component.css']
})
export class RegistroPresupuestoComponent implements OnInit {
  formRol: FormGroup;
  gestion: any = new Date().getFullYear();
  UnidadesUmss: any = [];
  UnidadSeleccionada: Unidad;
  iduni: string;
  pres: Presupuesto;

  activarBtn: boolean = true;
  constructor(public fechaService: FechaService, private unidads: UnidadService, public presupuestoService: PresupuestoService, private router: Router, public monedaService: MonedaService) { }

  ngOnInit(): void {
    this.unidads.getAll().subscribe(data => {
      this.UnidadesUmss = data;
    });
    this.presupuestoService.getAll().subscribe(
      res => {
        this.presupuestoService.todos = res;
        console.log(res);
      },
      err => {
        console.log('error ', err);
      }
    );

  }

  presupuesto = new FormControl('', [Validators.required, Validators.min(1000), Validators.max(9999999)]);
  unidad = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.presupuesto.hasError('required')) {
      return 'Verifique los campos';
    } else {
      if (this.presupuesto.hasError('min')) {
        return 'El valor minimo es de 1000 Bs.'
      } else {
        if (this.presupuesto.hasError('max')) {
          return 'El valor maximo es de 9999999 Bs.'
        }
      }
    }
    return 'Verifique los campos';
  }

  getPresupuestoUnidad(id: any, gestion: any) {

    this.presupuestoService.obtenerPresupuesto(id, gestion).subscribe(
      res => {
        this.presupuestoService.presupuesto = res;
        console.log(res);
      },
      err => {
        console.log('error ', err);
      }
    );
  }

  getFlag(id: any, gestion: any) {

    var flag: boolean = false;
    console.log(this.presupuestoService.todos[0].id);
    for (let index = 0; index < this.presupuestoService.todos.length; index++) {
      const element = this.presupuestoService.todos[index];
      if (element.id_unidad == id && element.gestion == gestion) {
        flag = true;
      }

    }
    return flag;
  }

  guardarPresupuesto() {
    this.activarBtn = false;
    if (!this.presupuesto.invalid && !this.unidad.invalid) {
      //let id_unidad = this.unidad.value;
      let presupuestoUnidad = {
        id: '',
        id_unidad: this.unidad.value as string,
        presupuesto: this.presupuesto.value as string,
        gestion: new Date().getFullYear(),
      }
      if (this.getFlag(presupuestoUnidad.id_unidad, presupuestoUnidad.gestion)) {

        console.log("El presupuesto ya esta registrado");
        Swal.fire('El presupuesto de esta unidad ya esta registrado', '', 'warning');
        this.activarBtn = true;

      } else {
        console.log("El presupuesto no esta registrado");
        Swal.fire({
          title: 'Seguro que quiere registrar este presupuesto',
          text: "Podra editar el presupuesto en la lista de presupuestos",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.fechaService.crearPresupuesto(presupuestoUnidad).subscribe(
              res => {
                console.log(res);
                Swal.fire(
                  'Exito!',
                  'Presupuesto registrado con exito',
                  'success'
                )
                this.router.navigate(['/presupuestos']);
              },
              err => {
                console.log('error ', err);
                Swal.fire('No se pudo verificar la unidad', '', 'error');
                this.activarBtn = true;
              }
            );

          } else {
            this.activarBtn = true;
          }
        })

      }
    } else {
      Swal.fire('Verifique los campos!', '', 'error');
      this.activarBtn = true;
    }
  }
}
