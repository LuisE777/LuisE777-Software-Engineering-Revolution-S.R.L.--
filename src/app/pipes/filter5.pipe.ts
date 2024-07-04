import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter5'
})
export class Filter5Pipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts =[] as  any;
    for(const rol of value){
      if( rol.rolnom.toLowerCase().indexOf(args.toLowerCase())>-1
      ||rol.descrip.toLowerCase().indexOf(args.toLowerCase())>-1
      ){
        resultPosts.push(rol);
      }
    } 
    return resultPosts;
  }

}
