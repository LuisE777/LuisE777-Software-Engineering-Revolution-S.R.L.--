import { Component, OnInit } from '@angular/core';
import { UnidadService } from 'src/app/services/unidad.service';

@Component({
  selector: 'app-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.css']
})
export class MenuInicioComponent implements OnInit {
  UnidadesUmss: any = [];
  constructor(private unidads: UnidadService) { }

  ngOnInit(): void {
    this.unidads.getAll().subscribe(data => {
      this.UnidadesUmss = data;
    })
  }

  unidadesAfiliadas() {
    return "Nuestro sistema cuenta con " + this.UnidadesUmss.length + " unidades afiliadas";
  }

  final() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
