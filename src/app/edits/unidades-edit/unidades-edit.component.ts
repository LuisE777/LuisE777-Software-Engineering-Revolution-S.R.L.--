import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadService } from 'src/app/services/unidad.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-unidades-edit',
  templateUrl: './unidades-edit.component.html',
  styleUrls: ['./unidades-edit.component.css']
})
export class UnidadesEditComponent implements OnInit {
  angForm: FormGroup;
  submitted = false;
  users: any = [];
  facultades: any = [];
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  nombrePattern: string = '([a-zA-Z- -.]+)';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private unidadService: UnidadService,
    private usersService: UsuarioService,
    private _location: Location
  ) {
  }
  UsuarioUmssRol: string;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getUnidad(id);
    this.createForm();
    this.getusers();
    this.getfacultades();
    this.UsuarioUmssRol = localStorage.getItem('rol') + '';
    console.log(this.route.snapshot.paramMap.get('id'))
  }
  getfacultades() {
    this.usersService.getAllFacultad().subscribe(data => {
      this.facultades = data;
    });
  }
  getUnidad(id) {
    this.unidadService.getById(id).subscribe(data => {
      this.angForm = this.fb.group({
        nombre: [data.nombre, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
        facultad: [data.facultad, [Validators.required, Validators.pattern(this.nombrePattern)]],
        // presupuesto: [data.presupuesto, [Validators.required]],
        telefono: [data.telefono, [Validators.required, Validators.pattern('^[0-9 ]+$')]]
      });
    });
  }
  // Creacion de formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
      facultad: ['', [Validators.required, Validators.pattern(this.nombrePattern)]],
      // presupuesto: ['', [Validators.required, Validators.pattern('^[0-9 ]')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]]
    });
  }
  // Envio de formulario
  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      this.unidadService.getExiste(this.angForm.controls.nombre.value).subscribe(data => {
        console.log('x qui')
        console.log(data)
        //&& this.idDeUsuario!=data[0].id
        if (data.length != 0 && this.route.snapshot.paramMap.get('id') != data[0].id) {
          Swal.fire({
            icon: 'error',
            text: 'La unidad ya existe',
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          const id = this.route.snapshot.paramMap.get('id');
          const form = new FormData();
          form.append('nombre', this.angForm.controls.nombre.value);
          form.append('facultad', this.angForm.controls.facultad.value);
          // form.append('presupuesto', this.angForm.controls.presupuesto.value);
          form.append('telefono', this.angForm.controls.telefono.value);
          console.log("el id es")
          console.log(id)
          this.unidadService.update(id, form).subscribe(res => {
            // this.router.navigate(['unidades/']);
            // ojo luego cambiar esto
            this.goBack();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Actualizado!',
              showConfirmButton: false,
              timer: 1500
            });
          }, (error) => {
            Swal.fire({
              icon: 'error',
              text: 'No se puedo actualizar!',
              showConfirmButton: false,
              timer: 1500
            });
          });
        }
      })
    }
    return true;
  }
  getusers() {
    this.usersService.getAllUser().subscribe(data => {
      this.users = data;
    });
  }
  redirigir() {
    if (this.UsuarioUmssRol === 'Administrador del Sistema') {
      this.router.navigate(['administrador/']);
    } else {
      this.router.navigate(['usuario/']);
    }
  }
  goBack() {
    this._location.back();
  }
}
