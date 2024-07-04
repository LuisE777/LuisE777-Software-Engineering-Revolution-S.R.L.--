import { Component, Directive, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router"
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { Item } from './item';
import { DiagitemComponent } from './diagitem/diagitem.component';
import { NoticeallService } from './diagitem/noticeall.service';
import { HttpClient } from '@angular/common/http';
import { Service } from './diagitem/autocompletar/item.service'; //getting api data 
import { Location } from '@angular/common';
import { ItemService } from '../services/item.service';
import { ItemSup } from '../models/itemSup.model';
import { NavbarService } from '../navbar/navbar.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { environment } from '../env';

export interface Pivot {
  "unidad_id": number,
  "itemsuperior_id": number,
  "montoasig": number,
  "periodo": string
}
export interface UnidadItemsAsing {
  "id": number,
  "nomitemSup": string,
  "descripSup": string,
  "created_at": string,
  "updated_at": string,
  "pivot": Pivot
}

export interface ItemsArray {
  "id": number,
  "nomitem": string,
  "descrip": string,
  "item_general_id": number,
  "created_at": string,
  "update_at": string,
}

@Component({
  selector: 'app-form-solicitud',
  templateUrl: './form-solicitud.component.html',
  styleUrls: ['./form-solicitud.component.css'],

})
export class FormSolicitudComponent implements OnInit {
  //API link 
  Url_api = environment.baseUrl;
  //Auto
  //DROP down selection
  form: FormGroup;
  itemSup: ItemSup[];
  UsuarioUmssRol: string;

  //carControl = new FormControl(this.itemSup[1].value);

  columnas: string[] = ['id', 'nombre', 'descrip', 'cantidad', 'precio', 'borrar'];

  datos: Item[] = [];

  ds = new MatTableDataSource<Item>(this.datos);

  @ViewChild(MatTable) tabla1: MatTable<Item>;
  //Form control
  carControl = new FormControl('', Validators.required);

  constructor(public dialog: MatDialog,
    private _location: Location
    , public getAPItems: Service
    , public recivedName: NoticeallService
    , private http: HttpClient
    , public itemSuperior: ItemService) {
    this.form = new FormGroup({
      car: this.carControl
    });
  }

  dataUnits: UnidadItemsAsing[];
  dataItems: ItemsArray[];
  IDunidadUser = localStorage.getItem('unidad_id');
  //Se guarda los datos de las unidades con presupuestos asignados 
  getUnidadAsigns() {
    return this.http.get<any>(this.Url_api + '/api/auth/unidaditemsuper/' + this.IDunidadUser).subscribe(
      data => { this.dataUnits = data });
  }

  abrirDialogo() {

    const dialogo1 = this.dialog.open(DiagitemComponent, {
      data: new Item(0, '', '', 1, 0)
    });

    dialogo1.afterClosed().subscribe(art => {

      if (art != undefined)
        this.agregar(art);
    });
  }

  borrarFila(cod: number) {
    Swal.fire({
      title: '¿Esta seguro(a) de eliminar?',
      text: "No podra deshacer esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.datos.splice(cod, 1);
        this.tabla1.renderRows();

        Swal.fire(
          'Eliminado!',
          'El item se ha eliminado de la solicitud.',
          'success'
        )
      }
    })

    /*
    if (confirm("Realmente quiere borrarlo?")) {

    }
    */
  }

  agregar(art: Item) {

    this.getAPItems.getData;
    this.dataItems = this.getAPItems.opts;

    const resultD = this.dataItems.filter(res => res.nomitem === this.recivedName.nombreItem);
    //console.log("El Id del producto es:",resultD[0].id);  //Done 

    if (this.datos.filter(b => b.item_id === resultD[0].id).length != 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El item ya existe!',
        showConfirmButton: false,
        timer: 1000
      })
    } else {
      console.log(this.dataItems);
      this.datos.push(new Item(resultD[0].id, this.recivedName.nombreItem, art.descrip, art.cantidad, art.precio));
      this.tabla1.renderRows();
      this.recivedName.nombreItem = '';
    }

  }

  startEdit(i: number) {//Working on   

    //console.log('HERERRERER', i);
    this.recivedName.nombreItem = this.datos[i].nombre;
    let massa: string = this.recivedName.nombreItem;
    const dialogRef = this.dialog.open(DiagitemComponent, {
      data: new Item(this.datos[i].item_id, massa, this.datos[i].descrip, this.datos[i].cantidad, this.datos[i].precio)
    });

  }

  ngOnInit(): void {
    this.getUnidadAsigns();
    this.itemSuperior.getAllItemsPresupuestadosActuales().subscribe(data => {
      this.itemSup = data;
    })

    this.UsuarioUmssRol = localStorage.getItem("rol") + "";
  }

  supera: number;

  onSelectChange($event) {

    let ID = (this.itemSup.find(i => i.nomitemSup === this.carControl.value)?.id)!;
    console.log('EL TIPOOOO', typeof (this.carControl.value));
    this.recivedName.itemGeneral = ID;

    let Objeto = this.dataUnits.find(i => i.nomitemSup === this.carControl.value)?.pivot.montoasig;
    //AD 
    console.log(typeof (Objeto));

    let montoAsig = parseInt(Objeto + '');
    this.supera = montoAsig;
    console.log("Maximo permitido", this.supera);
    console.log("GETTING FIELDS: ", this.datos);
  }

  enviarSolicitud() {
    let IDs = new Array;
    IDs = this.datos.map(a => a.item_id);
    // console.log("eL TAMANIO DE;",this.datos.length);
    let sum: number = this.datos.map(a => a.precio).reduce(function (a, b) {
      return a + b;
    });
    //Supera its the th eAsgined value in the DB to that item Superior
    const SUPERS = sum >= this.supera ? "Si" : "No";
    console.log('LA SUMMMMMA', sum);
    //Get the data into 
    console.log();
    const massa = {
      "unidad_id": localStorage.getItem('unidad_id'),
      "unidad_nombre": localStorage.getItem('unidaddegasto'),
      "tipo": this.carControl.value,
      "responsable": localStorage.getItem("nombre"),
      "montoestimado": sum,
      "estado": "Pendiente",
      "supera": SUPERS,
      "items": IDs,
      "itemsobs": this.datos
    };
    console.log(massa);
    let seHaGuardado;
    //http://127.0.0.1:8000/api/auth/solicitudes
    //
    this.http.post(this.Url_api + "/api/auth/solicitudes?token=" + localStorage.getItem('token'), massa)
      .subscribe((val) => {
        seHaGuardado = (Object.keys(val).length === 0) ? 0 : 1;
        console.log('The item: ', val);
        console.log("POST call successful value returned in body", val)

          //Maybe a if 
          , Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se envió la solicitud',
            showConfirmButton: false,
            timer: 2000
          })

      },
        response => {
          console.log("POST call in error", response), Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrio un error al enviar la solicitud',
            showConfirmButton: false,
            timer: 2000
          })
        },
        () => {
          console.log("The message POST has been send | Completed.");
          if (seHaGuardado === 1) {
            this.goBack()
          } else {

            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ha sucedido algo. No se ha enviado la solicitud',
              showConfirmButton: true,
              timer: 1500
            })
          }
        });

    //Here 
  }

  cancelar() {
    this.goBack()
  }
  goBack() {
    this._location.back();
  }
  getRol() {
    if (this.UsuarioUmssRol == "Jefe") {
      return "jefe";
    } else {
      return "usuarios";
    }
  }

}

