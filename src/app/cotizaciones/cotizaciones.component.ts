import { Component, OnInit, OnDestroy } from '@angular/core';
//import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UsuarioService } from './../services/usuario.service';
import { Unidades2 } from './../models/Unidad2.interfaz';
import { runInThisContext } from 'node:vm';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit, OnDestroy {
  public message: string;
  public p: number;
  UsuarioUmssRol = localStorage.getItem("rol") + ""
  constructor(private router: Router, private _location: Location, public solicitudService: SolicitudService, public _usuarioService: UsuarioService) { }
  filterPost = '';
  //obtenerSolicitud1
  ngOnInit(): void {
    this.obtenerSolicitud1();
  }
  async obtenerSolicitud1() {
    this.solicitudService.obtenerSolicitudItems().subscribe(
      res => {
        this.solicitudService.solicitudesitemspivot = res;
      },
      err => console.log(err)
    )
    //this.message="Recuperados"
  }
  //filtrando las solicitudes 
  esAceptado(estado: String) {
    return estado == "Aceptada" || estado == "Comparacion de cotizaciones" || estado == "Comparacion de cotizaciones" || estado == "Solicitando cotizaciones" || estado == "Compra autorizada" || estado == "Compra rechazada"
  }
  obteniendoSolicitud(idSol: any) {
    sessionStorage.setItem('solicitudbody', JSON.stringify(idSol));
    //obtengo la informacion de la informacion de la solicitud
    console.log(idSol);
    localStorage.setItem("unidadSol", idSol.unidad_nombre)
    localStorage.setItem("idUnidadSol", idSol.unidad_id)
    localStorage.setItem("solicitud", idSol.id)
    console.log(idSol.unidad_id);
  }

  ngOnDestroy() {

  }
  goBack() {
    this._location.back();
  }

  redirigir() {
    if (this.UsuarioUmssRol === "Cotizador") {
      this.router.navigate(['cotizador/'])
    } else if (this.UsuarioUmssRol === "Jefe") {
      this.router.navigate(['jefe/'])
    } else {
      this.router.navigate(['usuario/'])
    }
  }

}
