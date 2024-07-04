import { Facultad } from './../../models/facultad.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadService } from 'src/app/services/unidad.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-unidad',
  templateUrl: './registro-unidad.component.html',
  styleUrls: ['./registro-unidad.component.css']
})
export class RegistroUnidadComponent implements OnInit {

  angForm: FormGroup;
  submitted: boolean = false;
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
    this.createForm();
    this.getfacultades();
    this.UsuarioUmssRol = localStorage.getItem("rol") + "";
  }

  // Creacion de formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
      facultad: ['', [Validators.required, Validators.pattern(this.nombrePattern), Validators.minLength(3)]],
      /*presupuesto: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]],*/
      telefono: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]]
    });
  }

  // Envio de formulario
  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    }
    /////
    else {
      const form = new FormData();
      form.append("nombre", this.angForm.controls.nombre.value);
      form.append("facultad", this.angForm.controls.facultad.value);
      /*form.append("presupuesto",this.angForm.controls.presupuesto.value);*/
      form.append("telefono", this.angForm.controls.telefono.value);
      this.unidadService.getExiste(this.angForm.controls.nombre.value + "").subscribe(data => {
        if (data.length != 0) {
          Swal.fire({
            icon: 'error',
            text: 'La unidad ya existe',
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          this.unidadService.create(form).subscribe(res => {
            //this.router.navigate(['unidades/']);
            //ojo luego cambiar esto

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Unidad registrada exitosamente',
              showConfirmButton: false,
              timer: 2000
            }), this.router.navigate(['/unidades'])
          }, (error) => {
            Swal.fire({
              icon: 'error',
              text: 'Ups Algo salió mal!',
              showConfirmButton: false,
              timer: 2000
            })
          })
        }
      })
      return true;
    }
    ///

  }
  /////////////////////////////////////
  getusers() {
    this.usersService.getAllUser().subscribe(data => {
      this.users = data;
    });
  }
  getfacultades() {
    this.usersService.getAllFacultad().subscribe(data => {
      this.facultades = data;
    });
  }

  redirigir() {
    if (this.UsuarioUmssRol === "Administrador del Sistema") {
      this.router.navigate(['administrador/'])
    } else {
      this.router.navigate(['usuario/'])
    }
  }

  goBack() {
    this._location.back();
  }

  getRol() {
    if (this.UsuarioUmssRol == "Administrador del sistema") {
      return "administrador";
    } else {
      return "jefe";
    }
  }
}
