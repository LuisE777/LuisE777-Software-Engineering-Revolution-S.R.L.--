import { Presupuesto } from './../../models/presupuesto';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detalle-pres',
  templateUrl: './detalle-pres.component.html',
  styleUrls: ['./detalle-pres.component.css']
})
export class DetallePresComponent implements OnInit {
  unidad: String
  anio: String
  constructor(public _usuarioService: UsuarioService) { }
  detalle: any[] = [];
  importe: number
  importe2: Presupuesto
  importe3: number
  importe4: String
  ngOnInit(): void {
    this.getDetalle()
  }
  getDetalle() {
    this.unidad = localStorage.getItem("unidad_id") + "";
    this.anio = localStorage.getItem("anioPres") + "";
    this._usuarioService.getPres1(this.unidad, this.anio).subscribe(data => {
      console.log("esto salio pa")
      console.log(data)
      this.detalle = data
      console.log(this.detalle)
    })
    //este es el pres actual
    this._usuarioService.getPres2(this.unidad, this.anio).subscribe(data => {
      console.log("esto salio pa")
      console.log(data)
      this.importe = data.toFixed(2)

      console.log(this.importe)
    })
    //este es el tope
    this._usuarioService.getPres3(this.unidad, this.anio).subscribe(data => {
      console.log("esto salio pa3")
      console.log(data)
      this.importe2 = data[0]
      this.importe3 = this.importe2.presupuesto
      console.log(this.importe3)
    })
  }

  removeItem(empresa: any) {
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log("el id del item")
        console.log(empresa.id)
        this._usuarioService.delete1(empresa.id).subscribe(() => {
          this.getDetalle()
        });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }

}
