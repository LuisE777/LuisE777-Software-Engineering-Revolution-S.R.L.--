import { SeleccionEmpresaComponent } from './seleccion-empresa/seleccion-empresa.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatRadioModule } from '@angular/material/radio';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { SolicitudItems } from 'src/app/models/solicituditems.model';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from './../services/usuario.service';
import { Solicitud } from 'src/app/models/solicitud';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { SolicitudSendInform } from '../services/solicitud-rechazo.service';
import { Itemscotizados } from 'src/app/models/cotizacioncompleta.model';
import { SelecEmpresaComponent } from './selec-empresa/selec-empresa.component';
import { environment } from '../env';

export interface empresaCot {
  "id": number,
  "nombreemp": string,
  "repnombre": string,
  "telefono": string,
  "diremp": string,
  "rubro": string,
  "nit": string,
  "created_at": string,
  "updated_at": string,
  "pivot": {
    "id_solicitud": string,
    "id_empresa": string,
    "id": string,
    "observaciones": string,
    "plazo_de_entrega": string,
    "validez_oferta": string,
    "total": string,
    "cotizacion_pdf": string,
    "eleccion": string
  }
}

export interface itemscotizados {
  "id": number,
  "observaciones": string,
  "plazo_de_entrega": string,
  "validez_oferta": string,
  "total": number,
  "cotizacion_pdf": string,
  "eleccion": string,
  "created_at": string,
  "updated_at": string,
  "id_empresa": number,
  "id_solicitud": number,
  itemscot: {
    "id": string,
    "nombre": string,
    "descripcion": string,
    "cantidad": string,
    "precioUnitario": string,
    "total": string,
    "created_at": string,
    "updated_at": string,
    "empresa_cotizacion_id": number
  },
  empresa: {
    "id": number,
    "nombreemp": string,
    "repnombre": string,
    "telefono": string,
    "diremp": string,
    "rubro": string,
    "nit": string,
    "created_at": string,
    "updated_at": string

  }
}

export interface Empresa {

  "id": number,
  "nombreemp": string,
  "repnombre": string,
  "telefono": string,
  "diremp": string,
  "rubro": string,
  "nit": string,
  "created_at": string,
  "updated_at": string

}

export interface SolicitudCotizacion {
  id: number,
  responsable: string,
  montoestimado: string,
  estado: string,
  supera: string,
  tipo: string,
  unidad_nombre: string,
  unidad_id: string,
  created_at: string,
  items: [{
    id: number,
    nomitem: string,
    descrip: string,
    item_general_id: number,
    created_at: string,
    updated_at: string,
    pivot: {
      solicitud_id: number,
      item_id: number,
      nombre: string,
      descrip: string,
      cantidad: number,
      precio: number,
    }
  }]
}

@Component({
  selector: 'app-cotizando',
  templateUrl: './cotizando.component.html',
  styleUrls: ['./cotizando.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CotizandoComponent implements OnInit {

  URL_api = environment.baseUrl;
  //DEFINIENDO CLASSES para solicitud
  unaSolicitud: SolicitudItems;
  idobtenida;

  //Windows
  mostrarCotizacion: boolean = true;
  visible: boolean = false;

  //table item expadido
  isTableExpanded = false;

  //SOME DATA to WORK WITH
  dataToShow = new MatTableDataSource();
  columnsTable: string[] = ['id', 'name', 'age', 'address', 'actions', 'selected'];
  DUMMYdata = [
    {
      id: 1,
      cotizacion_pdf: "...",
      id_solicitud: 4,
      id_empresa: 5,
      obeservaciones: "",
      plazo_de_entrega: "1 dia(s)",
      total: 53,
      validez_oferta: "",
      seleccion: "Si",
      created_at: "",
      updated_at: "",
      items: [
        {
          id: 1,
          nombre: "Lapiceros",
          descrip: "Con punta 0.5 disponibles en negro",
          cant: 1,
          precio: 38
        },
        {
          id: 3,
          nombre: "Hojas",
          descrip: "De calidad Print paper",
          cant: 100,
          precio: 15

        }
      ],
      empresa: {
        nombreemp: "Libreria SARA S.R.L",
        repnombre: "Don Juan",
        telefono: "78228148",
        diremp: "AV. La paz",
        rubro: "Tecnologia",
        nit: "781856"
      }
    }

  ];
  idSoli: any = localStorage.getItem("solicitud") + "";
  solicitudInfo: Solicitud;
  constructor(public dialog: MatDialog, public _usuarioService: UsuarioService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    public solicitudService: SolicitudService,
    private http: HttpClient,
    public sendOneSolicitud: SolicitudSendInform) { }

  sub;

  selectedElement: itemscotizados;
  empDatos: empresaCot[];
  cotitems: itemscotizados[];
  MinValuated: number;

  ngOnInit() {
    //GETTING THE API DATA here TWO DIFRENT DATA SET 
    this.getOnes();
    this.getTwos();

    this._usuarioService.getAllInfoSol(this.idSoli).subscribe(data => {
      this.solicitudInfo = data[0];
    })
    //Obtenienco cotizaciones
    this.dataToShow.data = this.cotitems;

    //OBTENIENDO EL ID DE LA SOLICITUD del URL
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      //console.log(params)      
      this.idobtenida = params.get('id');

      if (this.solicitudService.solicitudesitemspivot.length === 0) {
        let recoverSolicitud: SolicitudItems;
        recoverSolicitud = JSON.parse(sessionStorage.solicitudbody);
        this.unaSolicitud = recoverSolicitud;

        return;
      }
      let solicituds: SolicitudItems[] = this.solicitudService.solicitudesitemspivot;
      this.unaSolicitud = solicituds.find(p => p.id == this.idobtenida)!;
    });

    console.log('Las massa', this.solicitudService.solicitudesitemspivot.length);

  }

  getOnes() {
    return this.http.get<any>(this.URL_api + '/api/auth/solicitud-cotizacion-items/' + localStorage.getItem('solicitud')).subscribe(
      data => { this.cotitems = data });
  }

  async getTwos() {
    return this.http.get<any>(this.URL_api + '/api/auth/empresa-cotizacion/' + localStorage.getItem('solicitud')).subscribe(
      data => { this.empDatos = data });

  }

  abrirDialogo() {
    const dialogo1 = this.dialog.open(SeleccionEmpresaComponent, {
    });

  }
  abrirDialogo1() {
    this._usuarioService.getAllEmpresas1(localStorage.getItem('solicitud') + "").subscribe(data => {
      if (data.length != 0) {
        const dialogo1 = this.dialog.open(SelecEmpresaComponent, {
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: 'No existe registro de que se haya generado cotizaciones para enviar a empresas',
          showConfirmButton: false,
          timer: 3500
        });
      }
    })

  }

  mostrarCotizaciones() {
    //Aqui

    this.cotitems; //Cotizacion con items
    this.empDatos; //Empresa con cotizacion   
    this.cambiarEstado()
    this.MinValuated = Math.min.apply(Math, this.cotitems.map(function (o) {
      return o.total;
    }));

    //console.log("El valor minimo", this.MinValuated);

    this.cotitems.forEach((element) => {
      let empresaGot = this.empDatos.find(x => x.id === element.id_empresa)!;
      element.empresa = empresaGot;
    });

    this.mostrarCotizacion = !this.mostrarCotizacion;
    this.visible = !this.visible;
    this.cambiarEstado()
    //console.log("items:",this.cotitems);
    this.dataToShow.data = this.cotitems;
    console.log("LA MASSA", this.dataToShow.data);

    //console.log("tamm2:",this.empDatos);

  }

  elegirMejorOpcion() {
    console.log("Nuevos", this.selectedElement);

    const { itemscot, empresa, ...newE } = this.selectedElement;
    console.log("MASSA", newE);

    let seHaGuardado;
    this.http.put(this.URL_api + "/api/auth/actualizar-recomendar", newE)
      .subscribe((val) => {
        seHaGuardado = (val === 1) ? 0 : 1;
        //console.log('The item: ',val);
        console.log("POST call successful value returned in body", val);
        window.location.reload();
      },
        response => {
          console.log("POST call in error", response), Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrio un error al actualizar.',
            showConfirmButton: false,
            timer: 1000
          })
        },
        () => {
          console.log("The message POST has been send | Completed.");
        });

  }

  //TABLE METHODS

  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;
    this.dataToShow.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }

  cambiarEstado() {
    this.solicitudService.actualizarEstado(this.solicitudInfo, "Comparacion de cotizaciones").subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    )
  }

  writeinformecotizado(solicitud: Solicitud) {
    //So we have a solicitud
    //Lest send it throught  the service
    this.sendOneSolicitud.SolicitudOne = solicitud;

    //this.sendOneSolicitud

    this.sendOneSolicitud.itemCotizadosxEmpresas = this.cotitems;
  }

}
