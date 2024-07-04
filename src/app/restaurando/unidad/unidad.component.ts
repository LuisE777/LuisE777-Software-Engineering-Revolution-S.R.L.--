import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadService } from 'src/app/services/unidad.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent implements OnInit {
  public p: number;
  unidades: any = [];
  filterPost = '';
  constructor(
    private unidads: UnidadService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {

  }

  ngOnInit(): void {
    this.getUnidades();
  }

  getUnidades() {
    this.usuarioService.getAllUnidadesEliminadas().subscribe(data => {
      this.unidades = data;
      console.log(data)
    })
  }

  selectedUnidad(id: string) {
    console.log("unidad seleccionado: " + id);

    //this.router.navigate(['/item/', id]);
  }

  removeUnidad(unidad: any) {
    Swal.fire({
      title: 'Seguro quiere restaurar este registro?',
      showDenyButton: true,
      confirmButtonText: `Restaurar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usuarioService.restaurarUnidades(unidad.id).subscribe(() => {

          this.getUnidades();
        });
        Swal.fire('Restaurado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se restauro el registro', '', 'info')
      }
    });
  }

}
