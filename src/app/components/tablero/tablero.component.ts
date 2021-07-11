import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  privilegios: string = "{\"admin\":false,\"jefe\":false,\"cotizador\":false,\"usuario\":false}";
  privilegios_json: any ='';

  constructor(public rolService: RolService) { }

  ngOnInit(): void {
    this.getPrivilegios();
    //this.privilegiosToJson();
  }

  privilegiosToJson(){    
    try{
      this.privilegios_json = JSON.parse(this.privilegios);
      localStorage.setItem('privilegios', JSON.stringify(this.privilegios_json));
      console.log(this.privilegios_json);
    } catch(error){
      console.log(error);
    }
  }

  getPrivilegios() {
    console.log(localStorage.getItem('rol'));
    this.rolService.getPrivilegios(localStorage.getItem('rol')).subscribe(
      res => {
        console.log("RESULTADO",res[0].privilegios);
        this.privilegios=res[0].privilegios;
        this.privilegiosToJson();
      },
      err => console.log('')
    )
  }
}
