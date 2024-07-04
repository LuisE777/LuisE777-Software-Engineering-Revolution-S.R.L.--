import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Presupuesto } from 'src/app/models/presupuesto';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-presupuestos',
  templateUrl: './lista-presupuestos.component.html',
  styleUrls: ['./lista-presupuestos.component.css']
})
export class ListaPresupuestosComponent implements OnInit {
  presAEditar: Presupuesto;
  filterPost = '';
  public p: number;
  constructor(public presupuestoService: PresupuestoService) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }
  presupuesto = new FormControl('', [Validators.required, Validators.min(1000), Validators.max(2147483647)]);
  obtenerDatos() {
    this.presupuestoService.obtenerDatos().subscribe(
      res => {
        this.presupuestoService.presupuestos = res;
        console.log(res);
      },
      err => {
        console.log('error ', err);
      }
    );
  }
  getErrorMessage() {

    if (this.presupuesto.hasError('required')) {
      return 'Verifique los campos';
    } else {
      if (this.presupuesto.hasError('min')) {
        return 'El valor minimo es de 1000 Bs.'
      } else {
        if (this.presupuesto.hasError('max')) {
          return 'El valor maximo es de 2147483647 Bs.'
        }
      }
    }
    return 'Verifique los campos';
  }

  seleccionarPresupuesto(presupuesto: any) {
    console.log(presupuesto);
    this.presAEditar = presupuesto;
    this.presupuesto.setValue(this.presAEditar.presupuesto);

  }

  eliminarPresupuesto(pres: Presupuesto, index: number) {
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log("index", index);
        console.log("length", this.presupuestoService.presupuestos.length - 1);

        this.presupuestoService.presupuestos.splice(index, 1);
        this.presupuestoService.presupuestos = [...this.presupuestoService.presupuestos];
        this.presupuestoService.eliminarPresupuesto(pres.id).subscribe(() => {

          Swal.fire('Eliminado!', '', 'success')
          //window.location.reload();
        });
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }

  editarPresupuesto() {
    if (this.presupuesto.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Llene los campos correctamente',
        showConfirmButton: false,
        timer: 2000
      })
    } else {
      this.presAEditar.presupuesto = this.presupuesto.value;

      this.presupuestoService.update(this.presAEditar).subscribe(
        res => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Presupuesto actualizado con exito',
            showConfirmButton: false,
            timer: 2000
          })
        }, err => {
          console.log(err);
          Swal.fire({
            icon: 'success',
            title: 'Revise los datos',
            showConfirmButton: false,
            timer: 2000
          })
        }
      );
    }
  }

}
