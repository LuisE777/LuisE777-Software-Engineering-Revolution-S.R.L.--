import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cotizacion } from 'src/app/models/cotizacion.model';
import { ItemCoti } from 'src/app/models/itemCoti.model';
import Swal from 'sweetalert2';
import { ItemCotiService } from '../item-coti.service';

@Component({
  selector: 'app-form-items-cot',
  templateUrl: './form-items-cot.component.html',
  styleUrls: ['./form-items-cot.component.css']
})
export class FormItemsCotComponent implements OnInit {
  cotizacionLista:Cotizacion[];

  item: ItemCoti = {
    'nombre': '',
    'descripcion': '',
    'cantidad': 0,
    'precioUnitario': 0,
    'total': 0,
    'empresa_cotizacion_id': ''
  };
  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private itemSer: ItemCotiService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.angForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
      precioUnitario: ['', Validators.required],
      total: ['', Validators.required],
    })
  }

  submitForm(){
    if (this.angForm.valid) {
      let item: ItemCoti = {
        'nombre': '',
        'descripcion': '',
        'cantidad': 0,
        'precioUnitario': 0,
        'total': 0,
        'empresa_cotizacion_id': ''
      };

      /*  Esto cambia al mismo objeto 'Item' al hacer push se lo modifica el que ya existia
      this.item.nombre = this.angForm.controls.nombre.value;
      this.item.descripcion = this.angForm.controls.descripcion.value;
      this.item.cantidad = this.angForm.controls.cantidad.value;
      this.item.precioUnitario = this.angForm.controls.precioUnitario.value;
      this.item.total = this.angForm.controls.total.value;

      this.itemSer.setItems(this.item);*/

      // Esto crea un nuevo objeto 'Item cada vez que se lo crea, valga la redundancia, y al hacer push al array solo lo añade

      item.nombre = this.angForm.controls.nombre.value;
      item.descripcion = this.angForm.controls.descripcion.value;
      item.cantidad = this.angForm.controls.cantidad.value;
      item.precioUnitario = this.angForm.controls.precioUnitario.value;
      item.total = this.angForm.controls.total.value;

      this.itemSer.setItems(item);

      Swal.fire({
        icon: 'success', 
        title: 'Añadido!',
        showConfirmButton: false,
        timer: 1000
      });
        this.angForm = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        cantidad: ['', Validators.required],
        precioUnitario: ['', Validators.required],
        total: ['', Validators.required],
      })
    }else{
      Swal.fire({
        icon: 'error', 
        text: 'Ups algo salió mal!',
        showConfirmButton: false,
        timer: 1000
      });
    }
  }

}