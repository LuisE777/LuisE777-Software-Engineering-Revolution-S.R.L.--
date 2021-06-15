import { Component, OnInit } from '@angular/core';

/*IMPORTS EXTRA */
import { Solicitud } from '../../models/solicitud';
import { HttpClient } from '@angular/common/http';
import { SolicitudSendInform } from '../../services/solicitud-rechazo.service'
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-redactar-informe',
  templateUrl: './redactar-informe.component.html',
  styleUrls: ['./redactar-informe.component.css']
})
export class RedactarInformeComponent implements OnInit {
  
   //Text area chars
   maxChars:number = 300;
   role = '';
   chars = 0;

  constructor(public oneSolicitud: SolicitudSendInform,
              private router: Router,
              private http: HttpClient,
              private _Activatedroute: ActivatedRoute) { }

  unaSolicitud: Solicitud;
  cotizador:string;
  rol:string;

  ngOnInit(): void {
    //Getting cotizador name
    this.cotizador=localStorage.getItem('nombre')!;
    this.rol = localStorage.getItem('rol')!;

    this.unaSolicitud = this.oneSolicitud.SolicitudOne;
    //console.log("RECIVED",this.oneSolicitud.SolicitudOne);
  }


  enviarInforme(){
    //Get the data into 
   // console.log(this.role);
   let idobtenida;
    this._Activatedroute.paramMap.subscribe(params => {
      //console.log(params);      
     idobtenida = params.get('id');

    });

    const massa = {
      "nombre_cotizador":localStorage.getItem('nombre'),
      "tipo_informe":"Rechazo",
      "informe_escrito":this.role,
      "id_solicitud": idobtenida      
    };
    //console.log(massa);
    let seHaGuardado;

    this.http.post("http://apiser-vicios.herokuapp.com/api/auth/informe", massa)
      .subscribe((val) => {        
        seHaGuardado = (Object.keys(val).length === 0) ? 0 : 1;
        console.log("POST call successful value returned in body", val)

        //Maybe a if 
        ,Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se envió el informe',
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
            this.router.navigate(['/solicitudes']);
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

  }

}
