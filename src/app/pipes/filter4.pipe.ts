import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter4'
})
export class Filter4Pipe implements PipeTransform {
  transform(value: any, args: any): any {
    const resultPosts =[] as  any;
    for(const unid of value){
      if(unid.nombre.toLowerCase().indexOf(args.toLowerCase())>-1
      ||unid.facultad.toLowerCase().indexOf(args.toLowerCase())>-1
      ||unid.telefono.toString().indexOf(args)>-1
      ){
        resultPosts.push(unid);
      }
    } 
    return resultPosts;
  }
}
