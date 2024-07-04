import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemSup } from 'src/app/models/itemSup.model';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-gen-edit',
  templateUrl: './item-gen-edit.component.html',
  styleUrls: ['./item-gen-edit.component.css']
})
export class ItemGenEditComponent implements OnInit {
  valorsito: any;
  unidaddegasto: any;
  angForm: FormGroup;
  submitted = false;
  itemSup: ItemSup[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemServ: ItemService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getItem(id);
    this.getItemsSup();
    this.createForm();
    this.unidaddegasto = localStorage.getItem('unidaddegasto');
  }

  getItem(id) {
    this.itemServ.getById(id).subscribe(data => {
      this.valorsito = data[0].nomitemSup;
      console.log(this.valorsito)
      console.log(data[0])
      this.angForm = this.fb.group({
        nomitem: [data[0].nomitem, Validators.required],
        descrip: [data[0].descrip, Validators.required],
        itemsuperior: [this.valorsito, Validators.required]
      });
    });
  }

  getItemsSup() {
    this.itemServ.getAllItems().subscribe(data => {
      this.itemSup = data;
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      nomitem: ['', Validators.required],
      descrip: ['', Validators.required],
      itemsuperior: ['', Validators.required]
    });
  }

  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      this.itemServ.getExiste1(this.angForm.controls.nomitem.value).subscribe(data => {
        console.log('x qui')
        console.log(data)
        //&& this.idDeUsuario!=data[0].id
        if (data.length != 0 && this.route.snapshot.paramMap.get('id') != data[0].id) {
          Swal.fire({
            icon: 'error',
            text: 'El item especifico ya existe',
            showConfirmButton: false,
            timer: 3000
          });
        } else {

          ////////////////////////////////////
          const id = this.route.snapshot.paramMap.get('id');
          const formdata: any = new FormData();
          formdata.append('nomitem', this.angForm.controls.nomitem.value);
          formdata.append('descrip', this.angForm.controls.descrip.value);
          formdata.append('itemsuperior', this.angForm.controls.itemsuperior.value);
          this.itemServ.update(id, formdata).subscribe(res => {
            Swal.fire({
              icon: 'success',
              title: 'Actualizado!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['items/']);
          }, (error) => {
            Swal.fire({
              icon: 'error',
              text: 'Ups algo salió mal!',
              showConfirmButton: false,
              timer: 1500

            });
          });

          /////////////////////////
        }
      })
      return true;

    }
  }

  goBack() {
    this.location.back();
  }

}
