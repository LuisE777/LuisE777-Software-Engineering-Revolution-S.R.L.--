import { Facultad } from './../../models/facultad.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-facultad',
  templateUrl: './facultad.component.html',
  styleUrls: ['./facultad.component.css']
})
export class FacultadComponent implements OnInit {
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
    this._usuarioService.getAllFacultadesEliminadas().subscribe(data => {
      this.facultades = data;
      console.log(data)
    })
  }
  restaurarFacultad(facultad: any) {
    Swal.fire({
      title: 'Seguro quiere restaurar este registro?',
      showDenyButton: true,
      confirmButtonText: `Restaurar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._usuarioService.restaurarFacultad(facultad.id).subscribe(() => {
          this.getFacultades()
        });
        Swal.fire('Restaurado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se restauro el registro', '', 'info')
      }
    });
  }
  goBack() {
    this.router.navigate(['tablero/'])
  }

}
