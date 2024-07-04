import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter13'
})
export class Filter13Pipe implements PipeTransform {
  transform(value: any, args: any): any {
    const resultPosts =[] as  any;
    for(const facultad of value){
      if( facultad.telefono.toString().indexOf(args)>-1
      ||facultad.nombre.toLowerCase().indexOf(args.toLowerCase())>-1
      ||facultad.decano.toLowerCase().indexOf(args.toLowerCase())>-1
      ||facultad.direccion.toLowerCase().indexOf(args.toLowerCase())>-1
      ||facultad.correo.toLowerCase().indexOf(args.toLowerCase())>-1
      ){
        resultPosts.push(facultad);
      }
    } 
    return resultPosts;
  }
}
