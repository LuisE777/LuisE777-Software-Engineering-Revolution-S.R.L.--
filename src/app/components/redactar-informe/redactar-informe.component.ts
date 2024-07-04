import { Component, OnInit } from '@angular/core';

/*IMPORTS EXTRA */
import { Solicitud } from '../../models/solicitud';
import { HttpClient } from '@angular/common/http';
import { SolicitudSendInform } from '../../services/solicitud-rechazo.service'
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import domtoimage from 'dom-to-image';
import { jsPDF } from 'jspdf'
import { environment } from 'src/app/env';

@Component({
  selector: 'app-redactar-informe',
  templateUrl: './redactar-informe.component.html',
  styleUrls: ['./redactar-informe.component.css']
})
export class RedactarInformeComponent implements OnInit {

  URL_API = environment.baseUrl;

  //Text area chars
  maxChars: number = 300;
  role = '';
  chars = 0;

  constructor(public oneSolicitud: SolicitudSendInform,
    private router: Router,
    private http: HttpClient,
    private _Activatedroute: ActivatedRoute) { }

  unaSolicitud: Solicitud;
  cotizador: string;
  rol: string;

  ngOnInit(): void {
    //Getting cotizador name
    this.cotizador = localStorage.getItem('nombre')!;
    this.rol = localStorage.getItem('rol')!;

    this.unaSolicitud = this.oneSolicitud.SolicitudOne;
  }

  enviarInforme() {
    let idobtenida;
    this._Activatedroute.paramMap.subscribe(params => {
      idobtenida = params.get('id');

    });

    const massa = {
      "nombre_cotizador": localStorage.getItem('nombre'),
      "tipo_informe": "Rechazo",
      "informe_escrito": this.role,
      "id_solicitud": idobtenida
    };
    let seHaGuardado;

    this.http.post(this.URL_API + "/api/auth/informe?token=" + localStorage.getItem('token'), massa)
      .subscribe((val) => {
        seHaGuardado = (Object.keys(val).length === 0) ? 0 : 1;
        console.log("POST call successful value returned in body", val)

          //Maybe a if 
          , Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se envió el informe',
            showConfirmButton: false,
            timer: 1000
          })

      },
        response => {
          console.log("POST call in error", response), Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrio un error al enviar el informe. Vuelva a intentarlo',
            showConfirmButton: false,
            timer: 1000
          })
        },
        () => {
          console.log("The message POST has been send | Completed.");
          if (seHaGuardado === 1) {
            console.log("SE HA ENVIADO ");
            this.router.navigate(['/solicitudes']);
          } else {
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

  topdf() {
    var canvas = document.getElementById('massa-id');
    domtoimage.toPng(canvas).then((dataUrl) => {
      let imagen = new Image();
      imagen.src = dataUrl;/*obtengo el screenshot*/
      let pdf = new jsPDF('p', 'mm', 'A3');/* creamos el pdf con jspdf, l es de landscape, mm: medidas en milímetros, y A4 el formato*/
      pdf.addImage(imagen, 10, 10, 297, 150); /*imagen: es la captura que insertaremos en el pdf, 18: margen izquierdo, 10: margen superior, 260:ancho, 189:alto, pueden jugar con estos valores, de esta forma me quedó prolijo en A4 horizontal*/
      pdf.save('informe.pdf'); /* descargamos el pdf con ese nombre.*/
    }
    );
  }
}

