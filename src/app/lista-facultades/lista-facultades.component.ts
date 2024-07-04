import { UsuarioService } from 'src/app/services/usuario.service';
import { Facultad } from './../models/facultad.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-lista-facultades',
  templateUrl: './lista-facultades.component.html',
  styleUrls: ['./lista-facultades.component.css']
})
export class ListaFacultadesComponent implements OnInit {
  filterPost = '';
  public p: number;
  facultades: Facultad[] = [];
  constructor(public _usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location) { }

  ngOnInit(): void {
    this.getFacultades()
  }
  getFacultades() {
    this._usuarioService.getAllFacultad().subscribe(data => {
      this.facultades = data;
      console.log(data)
    })
  }
  removeFacultad(facultad: any) {
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._usuarioService.deleteFacultad(facultad.id).subscribe(() => {
          this.getFacultades()
        });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }
  goBack() {
    this.router.navigate(['tablero/'])
  }

}
