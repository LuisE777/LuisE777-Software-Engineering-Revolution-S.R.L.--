import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-sup',
  templateUrl: './item-sup.component.html',
  styleUrls: ['./item-sup.component.css']
})
export class ItemSupComponent implements OnInit {
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
    this.itemS.getAllItems().subscribe(data => {
      this.items = data;
    })
  }

  selectedItem(id: string) {
    console.log("item seleccionado: " + id);

    //this.router.navigate(['/item/', id]);
  }

  removeItem(item: any, index: number) {
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.itemS.deleteSup(item.id).subscribe(() => {
          //this.items.splice(index, 1);
          this.getItems()
        });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }

}
