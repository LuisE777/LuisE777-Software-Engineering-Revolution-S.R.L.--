import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UsuarioService } from './../services/usuario.service';
import { Usuario } from '../models/usuario.model'
import { FormControl, Validators } from '@angular/forms';
import { Roles } from '../models/roles.interface';
import { UnidadService } from '../services/unidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  idDeUsuario: number;
  rolsito: any;
  public p: number;
  UsuariosUmss: Usuario[];
  usuarioAEditar: Usuario;
  RolesUmss: Roles[];
  UnidadesUmss: any = [];
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(public _usuarioService: UsuarioService,
    private http: HttpClient, private unidads: UnidadService) { }

  nombre = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  apellido = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  correo = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
  celular = new FormControl('', [Validators.required, Validators.min(60000000), Validators.max(79999999), Validators.pattern("^[0-9]*$")]);
  rolform = new FormControl('', [Validators.required]);
  unidadgasto = new FormControl('', [Validators.required]);

  filterPost = '';

  ngOnInit(): void {
    this._usuarioService.getAllUser().subscribe(data => {
      console.log(data);
      this.UsuariosUmss = data;
    });
    this._usuarioService.getAllRoles2().subscribe(data => {
      console.log(data[0]);
      this.RolesUmss = data;
      console.log(this.RolesUmss);
      console.log(this.RolesUmss);
    })

    this.unidads.getAll().subscribe(data => {
      console.log("Unidades");
      console.log("Unidades");
      console.log("Unidades");
      console.log(data);
      this.UnidadesUmss = data;
    })

  }

  seleccionarUsuario(user: any) {
    this.usuarioAEditar = user;
    console.log(this.usuarioAEditar);
    console.log("x zqui");
    console.log(user.id)
    this.idDeUsuario = user.id
    console.log(this.idDeUsuario)
    this.nombre.setValue(this.usuarioAEditar.name);;
    this.apellido.setValue(this.usuarioAEditar.lastname);
    this.correo.setValue(this.usuarioAEditar.email);
    this.celular.setValue(this.usuarioAEditar.cellphone);
    this.rolform.setValue(this.usuarioAEditar.rol);
    this.unidadgasto.setValue(this.usuarioAEditar.unidaddegasto);
  }

  verificarRol(rol: string) {

    if (rol === "Administrador del sistema") {
      return false
    } else {
      return true;
    }
  }

  eliminarUsuario(user: any, index: number) {
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //this.UsuariosUmss.splice(index, 0);
        //this.UsuariosUmss = [...this.UsuariosUmss];
        this._usuarioService.eliminarUsuario(user.id).subscribe(() => {
          this._usuarioService.getAllUser().subscribe(data => {
            this.UsuariosUmss = data;
          });
        });

        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }

  editarUsuario() {
    if (!this.nombre.invalid && !this.apellido.invalid && !this.correo.invalid && !this.celular.invalid && !this.rolform.invalid && !this.unidadgasto.invalid) {

      //console.log(this.usuarioAEditar);

      this._usuarioService.getExiste(this.nombre.value, this.apellido.value).subscribe(data => {
        console.log('x qui')
        console.log(data)
        if (data.length != 0 && this.idDeUsuario != data[0].id) {
          Swal.fire({
            icon: 'error',
            text: 'El usuario ya existe',
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          this.usuarioAEditar.name = this.nombre.value;
          this.usuarioAEditar.lastname = this.apellido.value;
          this.usuarioAEditar.email = this.correo.value;
          this.usuarioAEditar.cellphone = this.celular.value;
          this.usuarioAEditar.rol = this.rolform.value;
          this.usuarioAEditar.unidaddegasto = this.unidadgasto.value;
          this._usuarioService.editarUser(this.usuarioAEditar).subscribe(
            res => {
              Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado con exito',
                showConfirmButton: false,
              })
            }, err => {
              console.log(err);
              Swal.fire({
                icon: 'error',
                title: 'Algo salio mal',
                showConfirmButton: false,
              })
            }
          );
        }
      })

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Llene los campos correctamente',
        showConfirmButton: false,
      })
    }
  }

}

