import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudSendInform } from '../../../services/solicitud-rechazo.service';
import { Itemscotizados } from '../../../models/cotizacioncompleta.model';
import { Solicitud } from 'src/app/models/solicitud';
import Swal from 'sweetalert2';
import domtoimage from 'dom-to-image';
import { jsPDF } from 'jspdf'
import { Location } from '@angular/common';
import { environment } from 'src/app/env';
@Component({
  selector: 'app-informe-cotizado',
  templateUrl: './informe-cotizado.component.html',
  styleUrls: ['./informe-cotizado.component.css']
})
export class InformeCotizadoComponent implements OnInit {

  //API_URL:string = 'http://127.0.0.1:8000';
  //API_URL:string = "http://apiser-vicios.herokuapp.com";

 API_URL = environment.baseUrl;
   //Text area chars
   maxChars:number = 300;
   role = '';
   chars = 0;

  constructor(private router: Router,
              private http: HttpClient,
              private _Activatedroute: ActivatedRoute,
              private _location: Location,
              public oneSolicitud: SolicitudSendInform) { }

   unaSolicitud: Solicitud;
   cotizador:string;
   rol:string;

   //No hay cotizaciones
   hasCOTS:boolean;
   // selectedElement: itemscotizados;
   recivedCotizacion: Itemscotizados[]=[];

  ngOnInit(): void {
    //Getting cotizador name
    this.cotizador=localStorage.getItem('nombre')!;
    this.rol = localStorage.getItem('rol')!
    this.unaSolicitud = this.oneSolicitud.SolicitudOne;
    this.recivedCotizacion = this.oneSolicitud.itemCotizadosxEmpresas;
    //console.log("IN THE ACTUAL COMPONENT",this.recivedCotizacion);
    //console.log("the SERVICE ONE",this.oneSolicitud.itemCotizadosxEmpresas);
    (this.recivedCotizacion.length > 0)?this.hasCOTS=true: this.hasCOTS=false;
    console.log("TAMAñO", this.recivedCotizacion.length);
    console.log("MSSSAAA",this.hasCOTS);
  }

  enviarInforme(){
    let idobtenida;
    this._Activatedroute.paramMap.subscribe(params => {
      //console.log(params);      
     idobtenida = params.get('id');
    });

    const massa = {
      "nombre_cotizador":localStorage.getItem('nombre'),
      "tipo_informe":"Aceptacion",
      "informe_escrito":this.role,
      "id_solicitud": idobtenida      
    };
    //this.unaSolicitud.estado = "Devuelto";

    //FINAL SOLICITUD STATE  __> for test --> Comparacion de cotizaciones
    //console.log(massa);
    let seHaGuardado;
    //http://apiser-vicios.herokuapp.com
    //http://127.0.0.1:8000
    this.http.post(this.API_URL+"/api/auth/informe?token="+localStorage.getItem('token'), massa)
      .subscribe((val) => {        
        seHaGuardado = (Object.keys(val).length === 0) ? 0 : 1;
        console.log("POST call successful value returned in body", val)

        //Maybe a if 
        ,Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se envió el informe de aceptacion',
          showConfirmButton: false,
          timer: 1000
        })

      },
        response => {
          console.log("POST call in error", response) , Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrio un error al enviar el informe. Vuelva a intentarlo',
            showConfirmButton: false,
            timer: 1000
          })
        },
        () => {
          console.log("The message POST has been send | Completed.");
          if(seHaGuardado === 1){
            console.log("SE HA ENVIADO ");
            this.router.navigate(['/cotizacion']);
          }else {            
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ha sucedido algo. No se ha enviado la solicitud',
              showConfirmButton: false,
              timer: 2000
            })
          }
        });
        this.topdf();
  }
 //SAVE

 topdf(){
  var canvas = document.getElementById('massa-id');
  domtoimage.toPng(canvas).then((dataUrl)=>{
      let imagen= new Image();
      imagen.src=dataUrl;/*obtengo el screenshot*/
      let pdf = new jsPDF('p','mm','A3');/* creamos el pdf con jspdf, l es de landscape, mm: medidas en milímetros, y A4 el formato*/
      pdf.addImage( imagen, 10, 10, 297,200); /*imagen: es la captura que insertaremos en el pdf, 18: margen izquierdo, 10: margen superior, 260:ancho, 189:alto, pueden jugar con estos valores, de esta forma me quedó prolijo en A4 horizontal*/
      pdf.save( 'informe.pdf' ); /* descargamos el pdf con ese nombre.*/
  }
  );
}
goBack(){
  this._location.back();
}

}
