import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-item-sup',
  templateUrl: './registro-item-sup.component.html',
  styleUrls: ['./registro-item-sup.component.css']
})
export class RegistroItemSupComponent implements OnInit {

  angForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemsupService: ItemService,
    private _location: Location
  ) {
  }

  ngOnInit(): void {
    this.createForm();

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

      this.itemsupService.getExiste(this.angForm.controls.nomitemSup.value).subscribe(data => {
        if (data.length != 0) {
          Swal.fire({
            icon: 'error',
            text: 'El item superior ya existe',
            showConfirmButton: false,
            timer: 3000
          });
        } else {

          let nomitemSup = this.angForm.controls.nomitemSup.value
          let descripSup = this.angForm.controls.descripSup.value
          this.itemsupService.addItemSup(nomitemSup, descripSup).subscribe(res => {
            this.router.navigate(['itemsuperiores/']);

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Item registrado exitosamente',
              showConfirmButton: false,
              timer: 2000
            })
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

    }
    return true;
  }

  goBack() {
    this._location.back();
  }
}
