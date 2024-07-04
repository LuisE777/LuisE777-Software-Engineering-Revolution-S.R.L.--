import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facultad-edit',
  templateUrl: './facultad-edit.component.html',
  styleUrls: ['./facultad-edit.component.css']
})
export class FacultadEditComponent implements OnInit {
  angForm: FormGroup;
  submitted = false;
  id2: any;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  nombrePattern: string = '([a-zA-Z- -.]+)';
  constructor(public usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    console.log("asdas")
    this.getFacultad(id);
    this.createForm();
  }

  getFacultad(id) {
    this.usuarioService.getfacultadById(id).subscribe(data => {
      ///
      this.angForm = this.fb.group({
        nombre: [data.nombre, [Validators.required, Validators.pattern(this.nombrePattern)]],
        decano: [data.decano, [Validators.required, Validators.pattern(this.nombrePattern), Validators.minLength(3)]],
        telefono: [data.telefono, [Validators.required, Validators.pattern('^[0-9 ]+$')]],
        direccion: [data.direccion, [Validators.required, Validators.minLength(3)]],
        correo: [data.correo, [Validators.required, Validators.pattern(this.emailPattern)]]
      });
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(this.nombrePattern)]],
      decano: ['', [Validators.required, Validators.pattern(this.nombrePattern), Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }

  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      ////////////////////////////////////////////////   
      this.usuarioService.getExisteFacultad(this.angForm.controls.nombre.value).subscribe(data => {
        console.log('x qui')
        console.log(data)

        if (data.length != 0 && this.route.snapshot.paramMap.get('id') != data[0].id) {
          console.log('x qui1')
          Swal.fire({
            icon: 'error',
            text: 'La facultad ya existe',
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          //////////////////////////////////////////////////        
          console.log('x qui2')
          const id = this.route.snapshot.paramMap.get('id');
          this.id2 = this.route.snapshot.paramMap.get('id');
          console.log(id)
          const form = new FormData();
          form.append('nombre', this.angForm.controls.nombre.value);
          form.append('decano', this.angForm.controls.decano.value);
          form.append('correo', this.angForm.controls.correo.value);
          form.append('telefono', this.angForm.controls.telefono.value);
          form.append('direccion', this.angForm.controls.direccion.value);
          this.usuarioService.updateFacultad(this.id2, this.angForm.controls.nombre.value, this.angForm.controls.decano.value, this.angForm.controls.correo.value, this.angForm.controls.telefono.value, this.angForm.controls.direccion.value).subscribe(res => {
            this.router.navigate(['listaFacultades/']);
            // ojo luego cambiar esto
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Actualizado!',
              showConfirmButton: false,
              timer: 1500
            });
          }, (error) => {
            Swal.fire({
              icon: 'error',
              text: 'No se puedo actualizar!',
              showConfirmButton: false,
              timer: 1500
            });
            /////////       
          });
        }
        //////
      })
    }
    ////  
    return true;
  }
  goBack() {

    this._location.back();
  }

}
