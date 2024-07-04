import { Injectable } from '@angular/core';
import { Item } from './cotizacion-items.component';

@Injectable({
  providedIn: 'root'
})
export class ItemCotiService {

  item: Item;
  items: Item[] = [];

  constructor() { }

  setItems(item: Item){
    /*this.items.indexOf(item) === -1 ? this.items.push(item) : console.log("This item already exists");*/
    /*for (let i = 0; i < this.items.length; i++) {
      const element = this.items[i];
      if(element.nombre.toUpperCase != item.nombre.toUpperCase){
        this.items.push(item);
      }

    }*/
    this.items.push(item);
    console.log("items",this.items);
  }

  getItem(){
    return this.items;
  }
}
