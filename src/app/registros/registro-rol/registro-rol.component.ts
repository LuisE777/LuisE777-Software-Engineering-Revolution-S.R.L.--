import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RolService } from 'src/app/services/rol.service';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro-rol',
  templateUrl: './registro-rol.component.html',
  styleUrls: ['./registro-rol.component.css']
})
export class RegistroRolComponent implements OnInit {
  formRol: FormGroup;
  nombreRolTemp: String;
  privilegios_rol: string;
  rol = {
    id: '',
    rolnom: '',
    descrip: '',
    privilegios: ''
  }

  privilegios: FormGroup;

  constructor(public rolService: RolService, private fb: FormBuilder, private router: Router) {
    this.privilegios = fb.group({
      admin: false,
      jefe: false,
      cotizador: false,
      usuario: false
    });
  }

  ngOnInit(): void {
    this.obtenerRoles();
  }

  nombreRol = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]);
  descripcionRol = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]);

  getErrorMessage(c: Number) {
    switch (c) {
      case 1:
        if (this.nombreRol.hasError('required')) {
          return 'El valor es requerido';
        }
        return 'Solo se admiten letras.';
        break;
      case 2:
        if (this.descripcionRol.hasError('required')) {
          return 'El valor es requerido';
        }
        return 'Solo se admiten letras.';
        break;
      default:
        return '';
        break;
    }
  }

  guardarRol() {

    this.obtenerRoles();
    this.nombreRol.markAsTouched;
    this.descripcionRol.markAsTouched;
    if (!this.nombreRol.invalid && !this.descripcionRol.invalid) {
      this.rol.rolnom = this.nombreRol.value;
      this.rol.descrip = this.descripcionRol.value;
      this.rol.privilegios = this.privilegios_rol;
      this.crearRol();
      this.router.navigate(['/listarol']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Llene los campos correctamente',
        showConfirmButton: false,
      })
    }
  }

  obtenerRoles() {
    this.rolService.obtenerRoles().subscribe(
      res => {
        this.rolService.roles = res;
      },
      err => console.log('')
    )
  }

  crearRol() {
    this.rolService.crearRol(this.rol).subscribe(
      res => { console.log(res) }, err => console.log(err)
    );
  }

  verificarNombreUnico(nombre: String) {

    this.privilegios_rol = JSON.stringify(this.privilegios.value);
    console.log(this.privilegios_rol)
    this.nombreRolTemp = nombre;
    this.descripcionRol.markAsTouched();
    if (this.descripcionRol.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Verifique los campos',
        showConfirmButton: false,
      })
      return;
    }
    this.obtenerRoles();
    let flag: Boolean = true;
    this.rolService.roles.forEach(rol => {
      if (rol.rolnom.toUpperCase() === nombre.toUpperCase()) {
        flag = false;
      }
    });
    if (flag) {
      Swal.fire({
        icon: 'success',
        title: 'Rol creado exitosamente',
        timer: 1500,
        showConfirmButton: false,
      })
      this.guardarRol();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'El nombre ya existe',
        showConfirmButton: false,
      })

    }
  }
}
