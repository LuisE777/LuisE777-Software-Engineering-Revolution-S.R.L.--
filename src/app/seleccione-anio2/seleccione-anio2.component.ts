import { DetallePresupuesto2Component } from './../detalle-presupuesto2/detalle-presupuesto2.component';
import { DetallePresComponent } from './../presupuesto-actual/detalle-pres/detalle-pres.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-seleccione-anio2',
  templateUrl: './seleccione-anio2.component.html',
  styleUrls: ['./seleccione-anio2.component.css']
})
export class SeleccioneAnio2Component implements OnInit {

  unidad: String
  anio: String
  constructor(public _usuarioService: UsuarioService, public dialog: MatDialog, public dialogRef: MatDialogRef<DetallePresComponent>, private fb: FormBuilder, private router: Router) { }
  detalle: any[] = [];

  ngOnInit(): void {
    this.getDetalle()
  }
  miFormulario2: FormGroup = this.fb.group({
    anio: ['', [Validators.required]]
  })

  cancelar() {
    this.dialogRef.close();
  }

  guardarAnio() {
    let anio = this.miFormulario2.controls.anio.value
    localStorage.setItem("anioPres", anio)
    this.dialogRef.close();
    console.log(anio);
    this.router.navigate(['/detallePresupuesto']);

  }

  getDetalle() {
    this.unidad = localStorage.getItem("unidad_id") + "";
    this._usuarioService.getPres4(this.unidad).subscribe(data => {
      console.log("esto salio pa")
      console.log(data)
      this.detalle = data
      console.log(this.detalle)
    })
  }

}
