import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-sup-edit',
  templateUrl: './item-sup-edit.component.html',
  styleUrls: ['./item-sup-edit.component.css']
})
export class ItemSupEditComponent implements OnInit {

  angForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemsupService: ItemService,
    private _location: Location
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getItemSup(id);
    this.createForm();
  }

  getItemSup(id) {
    this.itemsupService.getItemSupById(id).subscribe(data => {
      this.angForm = this.fb.group({
        nomitemSup: [data.nomitemSup, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
        descripSup: [data.descripSup, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]]
      });
    });
  }

  // Creacion de formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      nomitemSup: ['', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
      descripSup: ['', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]]
    });
  }

  // Envio de formulario
  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      /////////////////////////////
      this.itemsupService.getExiste(this.angForm.controls.nomitemSup.value).subscribe(data => {
        console.log('x qui')
        console.log(data)
        //&& this.idDeUsuario!=data[0].id
        if (data.length != 0 && this.route.snapshot.paramMap.get('id') != data[0].id) {
          Swal.fire({
            icon: 'error',
            text: 'El item superior ya existe',
            showConfirmButton: false,
            timer: 3000
          });
        } else {

          ///////////////////////////////
          const nomitemSup = this.angForm.controls.nomitemSup.value;
          const descripSup = this.angForm.controls.descripSup.value;
          const form = new FormData();
          form.append('nomitemSup', this.angForm.controls.nomitemSup.value);
          form.append('descripSup', this.angForm.controls.descripSup.value);
          const id = this.route.snapshot.paramMap.get('id');
          this.itemsupService.updateItemSup(id, form).subscribe(res => {
            this.goBack();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Actualizado!',
              showConfirmButton: false,
              timer: 2000
            });
          }, (error) => {
            Swal.fire({
              icon: 'error',
              text: 'Ups Algo salió mal!',
              showConfirmButton: false,
              timer: 2000
            });
          });
        }
      })
      ///////////////////////////////////

    }
    return true;
  }

  goBack() {
    this._location.back();
  }

}
