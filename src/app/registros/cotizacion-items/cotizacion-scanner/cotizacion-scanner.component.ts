import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa.model';
import { ItemCotizacionService } from 'src/app/services/item-cotizacion-service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { empresaCot } from '../cotizacion-items.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cotizacion-scanner',
  templateUrl: './cotizacion-scanner.component.html',
  styleUrls: ['./cotizacion-scanner.component.css']
})
export class CotizacionScannerComponent implements OnInit {

  truearch: boolean = false;
  loader: boolean = false;
  myarch: string;
  final; boolean = true;
  form = new FormData();
  empresas: Empresa[] = [];
  cotizaciones: empresaCot[] = [];
  empresa_id: string;
  empresa_cotizacion_id: string;
  fileName = '';

  constructor(
    private userService: UsuarioService,
    private itemCotServ: ItemCotizacionService,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.getEmpresas();
    this.getEmpresasCot();
  }

  fileEvent(fileInput: Event) {
    let arch:any = fileInput.target;
    if(arch.files.length > 0){
      this.loader = true;
      this.form.append('file',arch.files[0]);
    }
  }

  getEmpresas(){
    this.userService.getAllEmpresas().subscribe(data => {
      this.empresas = data;
    })
  }

  getEmpresasCot(){
    this.userService.getAllEmpresasCot().subscribe(data => {
      this.cotizaciones = data;
    })
  }

  selectEmpresa(event){
    this.empresa_id = event.target.value;

  }

  selectEmpresaCot(event){
    this.empresa_cotizacion_id = event.target.value;
  }

  onFileChange(event) {
    let reader = new FileReader();

  if(event.target.files && event.target.files.length) {
    const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            this.form.append("urlpdf", file);
        }
  }
  }

  submitForm(){
    this.itemCotServ.subirArchivo(this.form).subscribe(
      resp => {
        Swal.fire({
          icon: 'success', 
          title: 'Registrado!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['cotizador']);
      },
      error => {
        Swal.fire({
          icon: 'error', 
          title: 'Ups Algo salio mal!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  goBack(){
    this._location.back();
  }

}
