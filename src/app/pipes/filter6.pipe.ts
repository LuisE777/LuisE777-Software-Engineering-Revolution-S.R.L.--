import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter6'
})
export class Filter6Pipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts =[] as  any;
    for(const presupuesto  of value){
      if( presupuesto.nombre.toLowerCase().indexOf(args.toLowerCase())>-1
      ||presupuesto.presupuesto.toString().indexOf(args)>-1
      ||presupuesto.gestion.toString().indexOf(args)>-1
      ){
        resultPosts.push(presupuesto );
      }
    } 
    return resultPosts;
  }

}
