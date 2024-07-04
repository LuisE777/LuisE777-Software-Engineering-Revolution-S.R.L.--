import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter2'
})
export class Filter2Pipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts =[] as  any;
    for(const solicitud of value){
      if( solicitud.montoestimado.toString().indexOf(args)>-1
      ||solicitud.estado.toLowerCase().indexOf(args.toLowerCase())>-1
      ||solicitud.supera.toLowerCase().indexOf(args.toLowerCase())>-1
      ||solicitud.responsable.toLowerCase().indexOf(args.toLowerCase())>-1
      ||solicitud.tipo.toLowerCase().indexOf(args.toLowerCase())>-1
      ){
        resultPosts.push(solicitud);
      }
    } 
    return resultPosts;
  }
}
