import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Location } from '@angular/common';
/* Extra imports*/
import { SolicitudSendInform } from '../../services/solicitud-rechazo.service'

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  public p:number;
  panelOpenState = false;
  constructor(public solicitudService: SolicitudService,private _location: Location, public sendOneSolicitud: SolicitudSendInform) { }
  filterPost=''
  ngOnInit(): void {
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes() {
    this.solicitudService.obtenerSolicitud().subscribe(
      res => {
        this.solicitudService.solicitudes = res; 
        console.log(res);
      },
      err => console.log(err)
    )
    this.solicitudService.obtenerSolicitudAceptada().subscribe(
      res => {
        this.solicitudService.solicitudesAprobadas = res; 
        console.log(res);
      },
      err => console.log(err)
    )
    this.solicitudService.obtenerSolicitudRechazada().subscribe(
      res => {
        this.solicitudService.solicitudesRechazadas = res; 
        console.log(res);
      },
      err => console.log(err)
    )
  }

  aceptarSolicitud(solicitud: Solicitud) {   
    //solicitud.estado = "Aceptada"; 
    this.solicitudService.actualizarEstado(solicitud, "Aceptada").subscribe(
      res => {    
        console.log(res);   
        //window.location.reload();     
        this.obtenerSolicitudes();
      },
      err => console.log(err)
    )
  }
  goBack(){
    this._location.back();
  }

  rechazarSolicitud(solicitud: Solicitud) {
    //solicitud.estado = "Rechazada";    
    this.solicitudService.actualizarEstado(solicitud, "Rechazada").subscribe(
      res => {    
        console.log(res);  
        //window.location.reload();      
        this.obtenerSolicitudes();
      },
      err => console.log(err)
    )
  }

  writeinformeRechazo(solicitud: Solicitud) {   
    this.sendOneSolicitud.SolicitudOne = solicitud;
  }
}
