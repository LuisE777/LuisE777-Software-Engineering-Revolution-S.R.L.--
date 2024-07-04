import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-empresas-edit',
  templateUrl: './empresas-edit.component.html',
  styleUrls: ['./empresas-edit.component.css']
})
export class EmpresasEditComponent implements OnInit {
  angForm: FormGroup;
  submitted = false;
  constructor(public usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getEmpresa(id);
    this.createForm();
  }
  getEmpresa(id) {
    this.usuarioService.getEmpresaById(id).subscribe(data => {
      this.angForm = this.fb.group({
        nombre: [data.nombreemp, [Validators.required, Validators.pattern('([a-zA-Z- -.]+)'), Validators.minLength(3)]],
        repLegal: [data.repnombre, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
        direccion: [data.diremp, [Validators.required, Validators.minLength(3)]],
        rubro: [data.rubro, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
        nit: [data.nit, [Validators.required, Validators.pattern('^[0-9 ]+$')]],
        telefono: [data.telefono, [Validators.required, Validators.pattern('^[0-9 ]+$')]]
      });
    });
  }
  createForm() {
    this.angForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$'), Validators.minLength(3)]],
      repLegal: ['', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      rubro: ['', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
      nit: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]]
    });
  }
  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      this.angForm.markAllAsTouched();
      return false;
    } else {
      /////////////////
      this.usuarioService.getExisteEmpresa(this.angForm.controls.nombre.value).subscribe(data => {
        console.log('x qui')
        console.log(data)
        if (data.length != 0 && this.route.snapshot.paramMap.get('id') != data[0].id) {
          console.log('x qui1')
          Swal.fire({
            icon: 'error',
            text: 'La empresa ya existe',
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          /////////////////////
          const form = new FormData();
          const id = this.route.snapshot.paramMap.get('id');
          form.append('nombreemp', this.angForm.controls.nombre.value);
          form.append('repnombre', this.angForm.controls.repLegal.value);
          form.append('diremp', this.angForm.controls.direccion.value);
          form.append('rubro', this.angForm.controls.rubro.value);
          form.append('nit', this.angForm.controls.nit.value);
          form.append('telefono', this.angForm.controls.telefono.value);
          this.usuarioService.updateEmpresa(id, form).subscribe(data => {
            Swal.fire({
              icon: 'success',
              title: 'Actualizado!',
              showConfirmButton: false,
              timer: 1500
            });
            this.goBack();
          }, (error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              text: 'Ups algo salió mal!',
              showConfirmButton: false,
              timer: 1500
            });
            /////////       
          });
        }
        //////
      })
    }
    ////  
    return true;
  }
  goBack() {
    this._location.back();
  }
}
