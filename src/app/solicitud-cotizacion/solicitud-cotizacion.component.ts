import { Empresa } from './../models/empresa.model';
import { element } from 'protractor';
import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from './../services/usuario.service';
import { DatePipe, DOCUMENT } from '@angular/common';
import { jsPDF } from 'jspdf'
import domtoimage from 'dom-to-image';
import { Cotizacion } from './../models/cotizacion.model';
import { Unidades2 } from './../models/Unidad2.interfaz';
import { Location } from '@angular/common';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-solicitud-cotizacion',
  templateUrl: './solicitud-cotizacion.component.html',
  styleUrls: ['./solicitud-cotizacion.component.css'],
  providers: [DatePipe]
})
export class SolicitudCotizacionComponent implements OnInit {
  myDate = new Date();
  fecha: any;
  cotizacionLista: Cotizacion[];
  variable: any;
  //
  EmpresaInfo: any;
  EmpresaId: any;
  //
  empresaEle: any;
  SolicitudId: any = localStorage.getItem("solicitud") + "";
  unidad: any = localStorage.getItem("idUnidadSol") + "";
  unidadName: any = localStorage.getItem("unidadSol") + "";
  facultad: any;
  telefono: any;
  unidadInfo: Unidades2;
  solicitudInfo: Solicitud;
  idSoli: any = localStorage.getItem("solicitud") + "";
  constructor(public solicitudService: SolicitudService, private datePipe: DatePipe, public _usuarioService: UsuarioService, private _location: Location) {
  }

  ngOnInit(): void {
    this._usuarioService.getinfounidad(this.unidad).subscribe(data => {
      this.unidadInfo = data[0];
      this.facultad = this.unidadInfo.facultad
      this.telefono = this.unidadInfo.telefono
    })
    this._usuarioService.getAllInfoSol(this.idSoli).subscribe(data => {
      this.solicitudInfo = data[0];
    })
    this.fecha = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
    this.variable = localStorage.getItem("solicitud") + ""
    this._usuarioService.getAllCotizaciones(this.variable).subscribe(data => {
      this.cotizacionLista = data;
    })
    this.empresaEle = localStorage.getItem("empresa") + ""
  }

  pdf() {
    var canvas = document.getElementById('imprimir3');
    domtoimage.toPng(canvas).then((dataUrl) => {
      let imagen = new Image();
      imagen.src = dataUrl;/*obtengo el screenshot*/
      let pdf = new jsPDF('l', 'mm', 'A4');/* creamos el pdf con jspdf, l es de landscape, mm: medidas en milímetros, y A4 el formato*/
      pdf.addImage(imagen, 10, 10, 280, 120); /*imagen: es la captura que insertaremos en el pdf, 18: margen izquierdo, 10: margen superior, 260:ancho, 189:alto, pueden jugar con estos valores, de esta forma me quedó prolijo en A4 horizontal*/
      //pdf.addImage( imagen, 10, 10, 260,189)
      pdf.save('cotizacion.pdf'); /* descargamos el pdf con ese nombre.*/
    }
    );
    this.cambiarEstado()
    this.guardarBD()
  }

  esSolicitud(variable: any) {
    return variable == localStorage.getItem("solicitud") + ""
  }

  goBack() {
    this._location.back();
  }

  cambiarEstado() {
    this.solicitudService.actualizarEstado(this.solicitudInfo, "Solicitando cotizaciones").subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    )
  }

  guardarBD() {
    console.log("Solicitud")
    console.log(this.SolicitudId)
    console.log("Empresa")
    console.log(localStorage.getItem("empresaId") + "")
    this.EmpresaId = localStorage.getItem("empresaId") + ""
    console.log(this.EmpresaId)
    this._usuarioService.addEmpCot(this.SolicitudId, this.EmpresaId).subscribe
      (data => { console.log(data) })
  }

  imprimir() {
    const printContent = document.getElementById("tablita");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt!.document.write(printContent!.innerHTML);
    WindowPrt!.document.close();
    WindowPrt!.focus();
    WindowPrt!.print();
    WindowPrt!.close();
  }

  imprimir2() {
    var canvas = document.getElementById('imprimir3');
    domtoimage.toPng(canvas).then((dataUrl) => {
      let imagen = new Image();
      imagen.src = dataUrl;/*obtengo el screenshot*/
      let pdf = new jsPDF('l', 'mm', 'A4');/* creamos el pdf con jspdf, l es de landscape, mm: medidas en milímetros, y A4 el formato*/
      pdf.addImage(imagen, 10, 10, 260, 189); /*imagen: es la captura que insertaremos en el pdf, 18: margen izquierdo, 10: margen superior, 260:ancho, 189:alto, pueden jugar con estos valores, de esta forma me quedó prolijo en A4 horizontal*/
      pdf.save('cotizacion.pdf').autoPrint(); /* descargamos el pdf con ese nombre.*/

    }
    );
    this.cambiarEstado()
    this.guardarBD()
  }

}
