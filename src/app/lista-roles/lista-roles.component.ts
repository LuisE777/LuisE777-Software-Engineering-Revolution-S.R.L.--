import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../models/rol.model';
import { RolService } from '../services/rol.service';
import { Roles } from './../models/roles.interface';
import { UsuarioService } from './../services/usuario.service';

@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrls: ['./lista-roles.component.css']
})
export class ListaRolesComponent implements OnInit {
  idDeRol: number;
  public p: number;
  privilegios_json: any;
  privils: any;
  privilegios_rol: string;

  filterPost = '';
  RolesUmss: Roles[] = [];
  rolAEditar: Roles;
  rolAEliminar: Roles;
  privilegios: FormGroup;

  constructor(public _usuarioService: UsuarioService, public rolService: RolService, public router: Router, private fb: FormBuilder) {
    this.privilegios = fb.group({
      admin: false,
      jefe: false,
      cotizador: false,
      usuario: false
    });
  }

  nombreRol = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  descripcionRol = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);

  ngOnInit(): void {
    this._usuarioService.getAllRoles().subscribe(data => {
      console.log(data[0]);
      this.RolesUmss = data;
      console.log(this.RolesUmss);
    })
  }

  getPrivilegios(rol: any) {
    let res: string = "";
    if (rol.privilegios) {
      try {
        this.privils = rol.privilegios
        this.privilegios_json = JSON.parse(this.privils);
      } catch (error) {
        console.log(error)
      }
    } else {
      return "Ninguno";
    }
    if (this.privilegios_json.admin) {

      res += " Admin"
    }
    if (this.privilegios_json.jefe) {

      res += " Jefe"
    }
    if (this.privilegios_json.cotizador) {

      res += "  Cotizador"
    }
    if (this.privilegios_json.usuario) {

      res += " Administrativo"
    }
    return res;

  }
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

  seleccionarRol(rol: Roles) {
    this.rolAEditar = rol;
    console.log(rol)
    this.nombreRol.setValue(this.rolAEditar.rolnom);
    this.descripcionRol.setValue(this.rolAEditar.descrip);
  }

  eliminarRol(rol: Roles, index: number) {
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.RolesUmss.splice(index, 1);
        this.RolesUmss = [...this.RolesUmss];
        this.rolService.eliminarRol(rol.id).subscribe(() => {
          console.log(this.RolesUmss);
        });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }

  verificarRol(rol: string) {

    if (rol === "Administrador del sistema") {
      return false
    } else {
      return true;
    }
  }

  editarRol() {
    this.privilegios_rol = JSON.stringify(this.privilegios.value);
    if (!this.nombreRol.invalid && !this.descripcionRol.invalid) {

      this.rolService.getExiste(this.nombreRol.value).subscribe(data => {
        console.log('x qui')
        console.log(data)
        if (data.length != 0 && this.idDeRol != data[0].id) {
          Swal.fire({
            icon: 'error',
            text: 'El rol ya existe',
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          this.rolAEditar.rolnom = this.nombreRol.value;
          this.rolAEditar.descrip = this.descripcionRol.value
          this.rolAEditar.privilegios = this.privilegios_rol;
          this.rolService.editarRol(this.rolAEditar).subscribe(
            res => {
              console.log(res);
              Swal.fire({
                icon: 'success',
                title: 'Rol actualizado con exito',
                showConfirmButton: false,
              })
            }, err => {
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
