import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { NoticeallService } from '../noticeall.service';
import { Service } from './item.service';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'app-autocompletar',
  templateUrl: 'autocompletar.component.html',
  styleUrls: ['autocompletar.component.css'],
})
export class AutocompletarComponent implements OnInit{
  //Testing one two three
  @Output() sendToDialog = new EventEmitter<string>();

  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<any[]>;
  Word:string;

  NotificarEleccion(){ //Only     
    this.sendToDialog.emit(this.Word);
  }

  getWord(cad: string){
    return this.Word=cad;    
  }

  subscription: Subscription;

  constructor(private service: Service,public sendName: NoticeallService) {

     this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
       }) 
    )
    //console.log('los datssssss',this.filteredOptions);
   }
   //This ones sets the name Of the Item opened to edit
   nameit:string;

  ngOnInit() {  
    //this.nameit = this.sendName.nombreItem;
    //OPEN CLEANS THE OBJECT
    //this.service.getData();

  }

  filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    //console.log(val);
    return this.service.getData()
     .pipe(
       map(response => response.filter(option => { 
         this.Word=val; 
         this.sendName.nombreItem = this.Word;
         //console.log('This one', val);
         //this.getWord(val);

         //console.log('Retruns all',option.idproducto); //Try to get only the id of the selected Product
         return option.nomitem.toLowerCase().indexOf(val.toLowerCase()) != -1
         // === 0 has to be equal from the initial index  -->  So from 0 
       }))
     )
   }    
}
