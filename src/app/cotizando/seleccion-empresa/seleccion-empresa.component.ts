import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../form-solicitud/item';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa.model';
@Component({

  selector: 'app-seleccion-empresa',
  templateUrl: './seleccion-empresa.component.html',
  styleUrls: ['./seleccion-empresa.component.css']
})
export class SeleccionEmpresaComponent implements OnInit {
  opcionSeleccionado: string  = '0';
  EmpresaInfo:any;
  EmpresaId:any;
  empresas: Empresa[] = [];
  constructor(public dialogRef: MatDialogRef<SeleccionEmpresaComponent>,private fb: FormBuilder,public _usuarioService:UsuarioService,  private router: Router,
    private route: ActivatedRoute) { //Anytime pass the Word.value
      //console.log(data);
    }
  ngOnInit(): void {
    this.getEmpresas()
  }

  miFormulario2: FormGroup = this.fb.group({
    empresa: ['',[Validators.required]]})

  cancelar() {    
    this.dialogRef.close();   
  }
  getEmpresas(){
    this._usuarioService.getAllEmpresas().subscribe(data => {
      this.empresas = data;
    })
  }
  guardarEmpresa(){

     let name  = this.miFormulario2.controls.empresa.value
     localStorage.setItem("empresa",name)
     this.router.navigate(['solicitudCotizacion/'])
     this.dialogRef.close(); 
     console.log(name);

     this._usuarioService.getAllInfoEmpresa(name).subscribe(data=>{
      this.EmpresaInfo=data[0];
      this.EmpresaId =this.EmpresaInfo.id
      console.log("Probando si obtiene id de la empresa")
      console.log(this.EmpresaId )
      localStorage.setItem("empresaId",this.EmpresaId )
    })

  }

}
