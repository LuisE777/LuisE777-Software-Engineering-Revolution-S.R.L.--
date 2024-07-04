import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Location } from '@angular/common';
import { empresaCot, InformeMod, itemscotizados } from 'src/app/models/empresacots.model';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { InformeCotizadoComponent } from '../components/redactar-informe/informe-cotizado/informe-cotizado.component';
import { environment } from 'src/app/env';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MisSolicitudesComponent implements OnInit {
  linkApi = environment.baseUrl;
  URL = this.linkApi + "/api/auth";
  UsuarioUmssRol: string;
  public p: number;
  filterPost = '';
  constructor(public solicitudService: SolicitudService, private _location: Location,
    private http: HttpClient) { }

  /*ADDS */
  empDatos: empresaCot[];
  cotitems: itemscotizados[];
  informeOne: InformeMod;
  //TABLE ATTS
  mostrarCotizacion: boolean = true;
  showInfo: boolean = true;
  visible: boolean = false;
  //table item expadido
  isTableExpanded = false;
  dataToShow = new MatTableDataSource();
  columnsTable: string[] = ['id', 'name', 'age', 'address', 'actions'];

  ngOnInit(): void {
    this.obtenerSolicitudes();
    this.UsuarioUmssRol = localStorage.getItem("rol") + "";
    /*ADDA*/

  }
  obtenerSolicitudes() {
    this.solicitudService.obtenerSolicitud1().subscribe(
      res => {
        this.solicitudService.solicitudes = res;
      },
      err => console.log(err)
    )
  }

  esUsuario(usuario: String) {
    return usuario == localStorage.getItem("nombre") + ""
  }

  goBack() {
    this._location.back();
  }

  /*ADDITIONS*/

  getOnes(id: number) {
    return this.http.get<any>(this.URL + '/solicitud-cotizacion-items/' + id).subscribe(
      data => { this.cotitems = data });
  }

  async getTwos(id: number) {
    return this.http.get<any>(this.URL + '/empresa-cotizacion/' + id).subscribe(
      data => { this.empDatos = data });

  }

  getInforme(id: number) {
    return this.http.get<any>(this.URL + '/informe-solicitud/' + id).subscribe(
      data => { this.informeOne = data });
  }

  MinValuated: number;
  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;
    this.dataToShow.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }
  /*
    mostrarCotizaciones(solicitud: Solicitud) {    
      //Aqui
      this.getOnes(solicitud.id);
       this.getTwos(solicitud.id);

      this.cotitems; //Cotizacion con items
      this.empDatos; //Empresa con cotizacion   
      this.dataToShow.data=this.cotitems;
      this.MinValuated = Math.min.apply(Math, this.cotitems.map(function(o) { 
        return o.total; }));

      //console.log("El valor minimo", this.MinValuated);

      this.cotitems.forEach( (element) => {      
        let empresaGot =this.empDatos.find(x => x.id===element.id_empresa)!;       
        element.empresa = empresaGot;           
      });

      this.mostrarCotizacion = !this.mostrarCotizacion;
      this.visible = !this.visible;

      //console.log("items:",this.cotitems);

      console.log("LA MASSA",this.dataToShow.data);

      //console.log("tamm2:",this.empDatos);

  }*/
  hasInfo: boolean = false;
  mostrarInforme(solicitud: Solicitud) {
    //this.informeOne.id=0;
    this.getInforme(solicitud.id);

    let seHaGuardado = (this.informeOne.id === 0) ? 0 : 1;
    if (seHaGuardado === 0) {
      this.hasInfo = true;
    }

    this.visible = !this.visible;

  }
  getRol() {
    if (this.UsuarioUmssRol == "Jefe") {
      return "jefe";
    } else {
      return "usuarios";
    }
  }
}
