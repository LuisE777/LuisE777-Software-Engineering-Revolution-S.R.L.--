import { Presupuesto } from 'src/app/models/presupuesto';
import { SeleccioneAnioComponent } from './../presupuesto-actual/seleccione-anio/seleccione-anio.component';
import { ItemPresService } from './../services/itemPres.service';
import { ItemPresupuesto } from './../models/itemPresupuesto.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ItemService } from "../services/item.service";
import { ItemSup } from '../models/itemSup.model';
import { Location } from '@angular/common';
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-item-sup-presupuesto',
  templateUrl: './item-sup-presupuesto.component.html',
  styleUrls: ['./item-sup-presupuesto.component.css']
})
export class ItemSupPresupuestoComponent implements OnInit {
  unidad: String
  importe: number
  importe2: Presupuesto
  importe3: number
  importe4: number
  unidaddegasto: any;
  angForm: FormGroup;
  submitted: boolean = false;
  itemSup: ItemSup[];
  constructor(
    public _usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemS: ItemService,
    private itemP: ItemPresService,
    private _location: Location,
    public dialog: MatDialog,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getItemsSup();
    this.createForm();

    this.unidaddegasto = localStorage.getItem("unidad_id");
  }

  getItemsSup() {
    this.itemS.getAllItems().subscribe(data => {
      this.itemSup = data;
    });
  }

  // Creacion de formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      //unidad: ['', Validators.required],
      itemsuperior: ['', Validators.required],
      montoasig: ['', Validators.required],
      descrip: ['', Validators.required],
      periodo: ['', Validators.required]
    });
  }

  // Envio de formulario
  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      let unidad_id = this.unidaddegasto
      let itemsuperior_id = this.angForm.controls.itemsuperior.value
      let montoasig = this.angForm.controls.montoasig.value
      let periodo = this.angForm.controls.periodo.value
      console.log(unidad_id, itemsuperior_id, montoasig, periodo)
      this.getDetalle(unidad_id, periodo);

      return false;      
    }
  }
  goBack() {
    this._location.back();
  }
  abrirDialogo() {
    this.unidad = localStorage.getItem("unidad_id") + "";
    this._usuarioService.getPres4(this.unidad).subscribe(data => {
      if (data.length != 0) {
        const dialogo1 = this.dialog.open(SeleccioneAnioComponent, {
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Esta unidad no tiene presupuesto para un año específico',
          showConfirmButton: false,
          timer: 3000
        });
      }

    })

  }
  getDetalle(unidad: any, anio: any) {
    //este es el pres actual
    this._usuarioService.getPres2(unidad, anio).subscribe(data => {
      console.log("esto salio pa")
      console.log(data)
      this.importe = data.toFixed(2)

      this.importe4 = Number(this.importe) + Number(this.angForm.controls.montoasig.value)
      console.log(this.importe4)

      this._usuarioService.getPres3(unidad, anio).subscribe(data => {
        console.log("esto salio pa3")
        console.log(data)
        if (data.length != 0) {
          this.importe2 = data[0]
          this.importe3 = this.importe2.presupuesto
          if (this.importe4 > this.importe3) {
            console.log("sobrepasa")
            Swal.fire({
              icon: 'error',
              text: 'No se guardo, sobrepasa el tope presupuestario',
              showConfirmButton: false,
              timer: 3000

            });
          } else {
            let unidad_id = this.unidaddegasto
            let itemsuperior_id = this.angForm.controls.itemsuperior.value
            let montoasig = this.angForm.controls.montoasig.value
            let periodo = this.angForm.controls.periodo.value
            console.log(unidad_id, itemsuperior_id, montoasig, periodo)
            console.log("no sobrepasa")
            this.itemP.addItemPres(unidad_id, itemsuperior_id, montoasig, periodo).subscribe(res => {
              Swal.fire({
                icon: 'success',
                title: 'Registrado!',
                showConfirmButton: false,
                timer: 1500
              });
              //this.router.navigate(['usuario/']);
              this.goBack()
            }, (error) => {
              console.log(error);
              Swal.fire({
                icon: 'error',
                text: 'Ups algo salió mal!',
                showConfirmButton: false,
                timer: 1500

              });
            });
          }
        } else {
          console.log("No hay datos papu")
          Swal.fire({
            icon: 'error',
            text: 'No tiene presupuesto registrado para este año',
            showConfirmButton: false,
            timer: 3000

          });
        }
      })
    })
    //este es el tope

  }

}

