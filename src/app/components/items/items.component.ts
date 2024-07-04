import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/form-solicitud/item';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  filterPost = ''
  items: any = [];
  public p: number;
  constructor(
    private itemS: ItemService,
    private router: Router,
  ) {
    this.getItems();
  }
  ngOnInit(): void {
  }
  getItems() {
    this.itemS.getAll().subscribe(data => {
      this.items = data;
    })
  }
  selectedItem(id: string) {
    console.log("item seleccionado: " + id);
  }
  removeItem(item: any, index: any) {
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.itemS.delete(item.id).subscribe(() => {
          this.items.splice(index, 1);
          this.getItems()
        });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }
}
