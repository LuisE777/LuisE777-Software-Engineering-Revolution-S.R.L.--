import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter1'
})
export class Filter1Pipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts =[] as  any;
    for(const empresa of value){
      if( empresa.nit.toString().indexOf(args)>-1||empresa.nombreemp.toLowerCase().indexOf(args.toLowerCase())>-1
      ||empresa.repnombre.toLowerCase().indexOf(args.toLowerCase())>-1
      ||empresa.telefono.toString().indexOf(args)>-1
      ||empresa.diremp.toLowerCase().indexOf(args.toLowerCase())>-1
      ||empresa.rubro.toLowerCase().indexOf(args.toLowerCase())>-1
      ||empresa.correo.toLowerCase().indexOf(args.toLowerCase())>-1
      ){
        resultPosts.push(empresa);
        console.log("esto imprime") 
        console.log( empresa)
      }
    } 
    return resultPosts;
  }
}
