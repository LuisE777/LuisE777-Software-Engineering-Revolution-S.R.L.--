import { UsuarioService } from 'src/app/services/usuario.service';
import { Roles } from './../../models/roles.interface';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from './../../models/rol.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rolusuario',
  templateUrl: './rolusuario.component.html',
  styleUrls: ['./rolusuario.component.css']
})
export class RolusuarioComponent implements OnInit {
  idDeRol: number;
  RolesUmss: Roles[] = [];
  public p: number;
  constructor(public _usuarioService: UsuarioService, public rolService: RolService, public router: Router, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this._usuarioService.getAllRolesEliminadas().subscribe(data => {

      this.RolesUmss = data;
      console.log(this.RolesUmss);
    })
  }

  eliminarRol(rol: Roles, index: number) {
    Swal.fire({
      title: 'Seguro quiere restaurar este registro?',
      showDenyButton: true,
      confirmButtonText: `Restaurar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.RolesUmss.splice(index, 1);
        this.RolesUmss = [...this.RolesUmss];
        this._usuarioService.restaurarRoles(rol.id).subscribe(() => {
        });
        Swal.fire('Recuperado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se recupero el registro', '', 'info')
      }
    });
  }

}
