import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Empresa } from 'src/app/models/empresa.model';
@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {
  filterPost = '';
  public p: number;
  empresas: Empresa[] = [];
  constructor(public _usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location) { }

  ngOnInit(): void {
    this.getEmpresas()
  }
  getEmpresas() {
    this._usuarioService.getAllEmpresas().subscribe(data => {
      this.empresas = data;
      console.log(data)
    })
  }
  removeEmpresa(empresa: any) {
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._usuarioService.delete(empresa.id).subscribe(() => {
          this.getEmpresas()
        });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }
  goBack() {
    this._location.back();
  }
}
