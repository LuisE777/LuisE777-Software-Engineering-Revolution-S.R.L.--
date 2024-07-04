import { Cotizacion } from './../../models/cotizacion.model';
import { Cotiz } from './../../models/cotiz.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa.model';
import { ItemCotizacionService } from 'src/app/services/item-cotizacion-service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { ItemCotiService } from './item-coti.service';
import { Location } from '@angular/common';
import { ItemCoti } from 'src/app/models/itemCoti.model';

export interface Item {
  "nombre": string,
  "descripcion": string,
  "cantidad": number,
  "precioUnitario": number,
  "total": number
  "empresa_cotizacion_id": string
}

export interface empresaCot {
  'id': number,
  'id_empresa': number,
  'id_solicitud': number,
  'observaciones': string,
  'plazo_de_entrega': string,
  'total': number,
  'validez_oferta': string,
  'cotizacion_pdf': string,
  'updated_at': Date,
  'created_at': Date
}

@Component({
  selector: 'app-cotizacion-items',
  templateUrl: './cotizacion-items.component.html',
  styleUrls: ['./cotizacion-items.component.css']
})
export class CotizacionItemsComponent implements OnInit {
  a: number = 10
  b: number = 5000
  idCotiz: String;
  //id de la solicitud en la q se encuentra
  idSoli: any = localStorage.getItem("solicitud") + "";
  flag: boolean = false;

  empresas: Empresa[] = [];
  cotizaciones: empresaCot[] = [];
  form: FormGroup;
  items: Item[] = [];
  empresa_id: string = localStorage.getItem("empresaId") + "";
  empresa_cotizacion_id: String;
  //empresa_cotizacion_id2: number;
  nameEmpresa: any = localStorage.getItem("empresa") + "";
  fileName = '';
  ///para obtener la tablita coon datos
  cotizacionLista: Cotizacion[];
  variable: any = localStorage.getItem("solicitud") + ""
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private arrayItem: ItemCotiService,
    private itemServ: ItemCotizacionService,
    private userService: UsuarioService,
    private _location: Location
  ) { }

  uploadForm: FormGroup;
  ngOnInit(): void {
    //this.getEmpresas();
    this.getEmpresasCot();
    this.createFormCotizacion();
    this.getItems();
    this.obtCot();
    this.uploadForm = this.fb.group({
      cotizacion_pdf: ['']
    });
    this.solicitudes()
  }

  getItems() {
    this.items = this.arrayItem.getItem()
  }

  getEmpresasCot() {
    this.userService.getAllEmpresasCot().subscribe(data => {
      this.cotizaciones = data;
    })
  }

  selectEmpresa(event) {
    // this.empresa_id = event.target.value;
    //console.log("selecciono este")
    //console.log(this.empresa_id)

  }

  selectEmpresaCot(event) {
    //this.empresa_cotizacion_id2 = event.target.value;

  }

  createFormCotizacion() {
    this.form = this.fb.group({
      fechaValidez: ['', Validators.required],
      plazoEntrega: ['', Validators.required],
      total: ['', Validators.required],
      observaciones: ['', Validators.required]

    })
  }

  removeItem(item: Item, index: number) {
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.items.splice(index, 1);
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('cotizacion_pdf')!.setValue(file);
    }
  }

  submitForm() {
    console.log("-------->>>> submitForm()");
    if (!this.form.valid) {
      return false;
    } else {
      this.empresa_cotizacion_id = this.idCotiz
      const obj = new FormData();
      obj.append('validez_oferta', this.form.controls.fechaValidez.value);
      obj.append('plazo_de_entrega', this.form.controls.plazoEntrega.value);
      obj.append('total', this.form.controls.total.value);
      obj.append('observaciones', this.form.controls.observaciones.value);
      obj.append('cotizacion_pdf', this.uploadForm.get('cotizacion_pdf')!.value);
      this.userService.updateEmpresasCot(this.empresa_cotizacion_id, obj).subscribe();
      // enviar array de items
      this.cotizacionLista.forEach(item => {
        const newitem = new FormData();
        newitem.append('nombre', item.nombre);
        newitem.append('descripcion', item.descrip);
        newitem.append('cantidad', String(item.cantidad));
        newitem.append('precioUnitario', String(item.precio));
        newitem.append('total', String(item.total_importe));
        console.log("este es su cotizacion id")
        console.log(this.empresa_cotizacion_id)
        newitem.append('empresa_cotizacion_id', String(this.empresa_cotizacion_id));
        this.itemServ.create(newitem).subscribe(res => {
        });
      });
      Swal.fire({
        icon: 'success',
        title: 'Registrado!',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/cotizacion/items-cotizados']);
      return true;
    }
  }

  goBack() {
    this._location.back();
  }
  //obtiene la cotizacion de acuerdo al id de la empresa y el id de la solicitud
  obtCot() {
    console.log("id solicitud"),
      console.log(this.idSoli),
      console.log("id empresa"),
      console.log(this.empresa_id),
      this.userService.getIDCot(this.idSoli, this.empresa_id).subscribe(data => {
        console.log("esto salio COMO ID DE COTIZACION")
        console.log(data)
        console.log(data[0].id)
        this.idCotiz = data[0].id + ""
        //console.log(this.idCotiz+"")
      })
    return this.idCotiz
  }
  //aqui agregue para la tabla de abajo
  esSolicitud(variable: any) {
    return variable == localStorage.getItem("solicitud") + ""
  }
  //para obtener todo
  solicitudes() {
    this.userService.getAllCotizaciones(this.variable).subscribe(data => {
      this.cotizacionLista = data;
    })
  }
  guardarItems() {
    this.arrayItem.items = [];

    for (let index = 0; index < this.cotizacionLista.length; index++) {
      const element = this.cotizacionLista[index];
      console.log(element);

      let item: ItemCoti = {
        'nombre': '',
        'descripcion': '',
        'cantidad': 0,
        'precioUnitario': 0,
        'total': 0,
        'empresa_cotizacion_id': ''
      };

      item.nombre = element.nombre;
      item.descripcion = element.descrip;
      item.cantidad = parseInt(element.cantidad);
      item.precioUnitario = parseInt(element.precio);
      item.total = parseInt(element.total_importe);
      this.arrayItem.setItems(item);
    }
    this.getItems();
    this.cambiarFlag();
  }

  cambiarFlag() {
    this.flag = !this.flag;
  }

}