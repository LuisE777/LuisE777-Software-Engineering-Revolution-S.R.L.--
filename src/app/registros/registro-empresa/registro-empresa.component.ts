import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UsuarioService } from './../../services/usuario.service';
@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {
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
      repLegal: ['', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      rubro: ['', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
      nit: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]],
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
      ///////////////////////////////////////////////
      this._usuarioService.getExisteEmpresa(this.angForm.controls.nombre.value + "").subscribe(data => {
        if (data.length != 0) {
          Swal.fire({
            icon: 'error',
            text: 'La empresa ya existe',
            showConfirmButton: false,
            timer: 3000
          });
        } else {

          ////////////////////////////////////////////////
          let name = this.angForm.controls.nombre.value
          let repname = this.angForm.controls.repLegal.value
          let diremp = this.angForm.controls.direccion.value
          let rubro = this.angForm.controls.rubro.value
          let nit = this.angForm.controls.nit.value
          let telefono = this.angForm.controls.telefono.value
          let correo = this.angForm.controls.correo.value
          this._usuarioService.addEmpresa(name, repname, diremp, nit, telefono, rubro, correo).subscribe
            (data => {
              this._usuarioService.restaurarEmpresa(data.id).subscribe(data => {
                this.router.navigate(['listaEmpresas/'])

              }),
                console.log(data.id), Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Empresa registrada exitosamente',
                  showConfirmButton: false,
                  timer: 2000
                })
            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'No se pudo guardar la empresa',
                showConfirmButton: false,
                timer: 2000
              })
            })
        }
      })

      ///////////////////////////////////
    }
    return true;
  }

  goBack() {
    this._location.back();
  }

}
