import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts =[] as  any;
    for(const usuario of value){
      if( usuario.rol.toLowerCase().indexOf(args.toLowerCase())>-1
      ||usuario.name.toLowerCase().indexOf(args.toLowerCase())>-1
      ||usuario.lastname.toLowerCase().indexOf(args.toLowerCase())>-1
      ||usuario.email.toLowerCase().indexOf(args.toLowerCase())>-1
      ||usuario.cellphone.toString().indexOf(args)>-1
      ||usuario.unidaddegasto.toLowerCase().indexOf(args.toLowerCase())>-1){
        resultPosts.push(usuario);
      }
    } 
    return resultPosts;
  }

}
