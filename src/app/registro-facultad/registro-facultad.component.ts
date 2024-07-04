import { Facultad } from './../models/facultad.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-facultad',
  templateUrl: './registro-facultad.component.html',
  styleUrls: ['./registro-facultad.component.css']
})
export class RegistroFacultadComponent implements OnInit {
  angForm: FormGroup;
  submitted: boolean = false;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  nombrePattern: string = '([a-zA-Z- -.]+)';
  constructor(public _usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {

    this.angForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(this.nombrePattern)]],
      decano: ['', [Validators.required, Validators.pattern(this.nombrePattern), Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }

  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      this.angForm.markAllAsTouched();
      return false;
    } else {
      console.log("Aceptado")

      this._usuarioService.getExisteFacultad(this.angForm.controls.nombre.value + "").subscribe(data => {
        if (data.length != 0) {
          Swal.fire({
            icon: 'error',
            text: 'La facultad ya existe',
            showConfirmButton: false,
            timer: 3000
          });
        } else {

          let nombre = this.angForm.controls.nombre.value
          let decano = this.angForm.controls.decano.value
          let correo = this.angForm.controls.correo.value
          let telefono = this.angForm.controls.telefono.value
          let direccion = this.angForm.controls.direccion.value
          this._usuarioService.addFacultad(nombre, decano, correo, telefono, direccion).subscribe
            (data => {
              console.log(data), this.router.navigate(['listaFacultades/']), Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Facultad registrada exitosamente',
                showConfirmButton: false,
                timer: 2000
              })
            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'No se pudo guardar la facultad',
                showConfirmButton: false,
                timer: 2000
              })
            })

        }
      })

    }
    return true;
  }

  goBack() {
    this.router.navigate(['tablero/'])
  }

}
