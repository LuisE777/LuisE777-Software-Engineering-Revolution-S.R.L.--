import { Unidades2 } from './../../models/Unidad2.interfaz';
import { Unidad } from './../../models/unidad.model';
import { UnidadService } from 'src/app/services/unidad.service';
import { Unidades } from './../../models/unidades.model';
import { Roles } from './../../models/roles.interface';
import { Usuario } from '../../models/usuario.model'
import Swal from 'sweetalert2';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { GuardsCheckStart } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  RolesUmss: Roles[];
  UnidadesUmss: any = [];

  ngOnInit(): void {
    let usuario123 = localStorage.getItem("nombre")
    console.log(usuario123)
    this._usuarioService.getAllRoles2().subscribe(data => {
      console.log(data[0]);
      this.RolesUmss = data;
      console.log(this.RolesUmss);
      console.log(this.RolesUmss);
    })

    this.unidads.getAll().subscribe(data => {
      console.log(data);

      this.UnidadesUmss = data;
    })
  }

  constructor(private fb: FormBuilder, private router: Router, public _usuarioService: UsuarioService, private unidads: UnidadService) { }
  bandera: number = 50;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  nombreApellidoPattern: string = '([a-zA-Z- ]+)';

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.nombreApellidoPattern)]],
    apellido: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.nombreApellidoPattern)]],
    correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    celular: ['', [Validators.required, Validators.min(60000000), Validators.max(79999999), Validators.pattern("^[0-9]*$")]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
    rol: ['', [Validators.required]],
    unidad: ['', [Validators.required]]
  })

  public passwordsMatch = (): boolean => {

    if (this.miFormulario.controls['password'].touched && this.miFormulario.controls['password2'].touched) {
      if (this.miFormulario.value.password === this.miFormulario.value.password2) {
        this.bandera = 1000
        return true;

      } else {
        return false;
      }
    }
    return true;
  }

  campoEmailEsValido() {
    return this.miFormulario.controls.correo.errors && this.miFormulario.controls.correo.touched
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      let camila = localStorage.getItem("nombre");
      return;
    } else if (!this.miFormulario.invalid && this.bandera > 50) {

      let name = this.miFormulario.controls.nombre.value
      let lastname = this.miFormulario.controls.apellido.value
      let email = this.miFormulario.controls.correo.value
      let password = this.miFormulario.controls.password.value
      let password_confirmation = this.miFormulario.controls.password2.value
      let cellphone = this.miFormulario.controls.celular.value
      let rol = this.miFormulario.controls.rol.value
      let unidaddegasto = this.miFormulario.controls.unidad.value

      this._usuarioService.getExiste(name, lastname).subscribe(data => {
        if (data.length != 0) {
          Swal.fire({
            icon: 'error',
            text: 'El usuario ya existe',
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          console.log(data)
          this._usuarioService.addUsuario(name, lastname, email, password, password_confirmation, cellphone, rol, unidaddegasto).subscribe
            (data => {
              this.router.navigate(['listausuarios/']), Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuario registrado exitosamente',
                showConfirmButton: false,
                timer: 2000
              })
            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'Correo ya utilizado, ingrese otro correo para registrar al usuario',
                showConfirmButton: false,
                timer: 2000
              })
            })
        }
      })

    }
  }

}
