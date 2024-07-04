import { DetallePresComponent } from './../detalle-pres/detalle-pres.component';
import { LoginComponent } from './../../login/login.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-seleccione-anio',

  templateUrl: './seleccione-anio.component.html',
  styleUrls: ['./seleccione-anio.component.css']
})
export class SeleccioneAnioComponent implements OnInit {
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
    this.dialog.open(DetallePresComponent, {
    });

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
