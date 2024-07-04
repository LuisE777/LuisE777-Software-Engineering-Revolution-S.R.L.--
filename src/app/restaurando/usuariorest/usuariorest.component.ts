import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuariorest',
  templateUrl: './usuariorest.component.html',
  styleUrls: ['./usuariorest.component.css']
})
export class UsuariorestComponent implements OnInit {

  idDeUsuario: number;
  rolsito: any;
  public p: number;
  UsuariosUmss: Usuario[];
  usuarioAEditar: Usuario;

  UnidadesUmss: any = [];
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this._usuarioService.getAllUsuariosEliminadas().subscribe(data => {
      this.UsuariosUmss = data;

    });

  }

  eliminarUsuario(user: any, index: number) {
    Swal.fire({
      title: 'Seguro quiere restaurar este registro?',
      showDenyButton: true,
      confirmButtonText: `Restaurar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //this.UsuariosUmss.splice(index, 0);
        //this.UsuariosUmss = [...this.UsuariosUmss];
        this._usuarioService.restaurarUsuarios(user.id).subscribe(() => {
          this._usuarioService.getAllUsuariosEliminadas().subscribe(data => {
            this.UsuariosUmss = data;
          });
        });

        Swal.fire('Restaurado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se restauro el registro', '', 'info')
      }
    });
  }

}

