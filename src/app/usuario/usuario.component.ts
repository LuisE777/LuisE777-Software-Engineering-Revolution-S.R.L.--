import { Component, OnInit } from '@angular/core';
import { Fecha } from '../models/fecha';
import { FechaService } from '../services/fecha.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  flag: boolean;
  fechas:Fecha[];

  constructor(public fechaService: FechaService) { }

  ngOnInit(): void {    
    this.fechaService.obtenerFecha().subscribe(
      res => {       
        this.fechaService.fechas = res;  
      },
      err => console.log(err)
    )
    this.validarFecha();
  }
  cargar(){
    window.location.reload();
  }

  validarFecha(){   
    //obtiene la fecha actual
    var today = new Date();
    today.setHours(0,0,0,0);    
    //console.log("Hoy", today);
    
    //convierte las fechas de date a string
    let l: number = this.fechaService.fechas.length-1;    
    if(l){
      var apertura: string = this.fechaService.fechas[l].apertura.toString() ;
      var cierre: string= this.fechaService.fechas[l].cierre.toString();
      if(apertura === undefined || cierre === undefined){
        return false;
      }
  
      //Transforma de formato Date Mysql a Date de javascript
      var jsApertura = new Date(Date.parse(apertura.replace(/[-]/g,'/')));
      var jsCierre = new Date(Date.parse(cierre.replace(/[-]/g,'/')));
      
      console.log("Flag ",((today >= jsApertura) && (today <= jsCierre)));
      //verifica si la fecha actual esta en rango de la fecha establecia      
      return ((today >= jsApertura) && (today <= jsCierre));
    } else {
      return false;
    }
    
  }

  toMysqlFormat(fecha: any) {
    return fecha.toISOString().slice(0, 19).replace('T', ' ');
  }

 /* obtenerFecha(){
    this.fechaService.obtenerFecha().subscribe(
      res => {
       
        this.fechaService.fechas = res;  
      },
      err => console.log(err)
    )
  }*/
}
