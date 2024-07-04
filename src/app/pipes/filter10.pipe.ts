import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter10'
})
export class Filter10Pipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts =[] as  any;
    for(const item of value){
      if( item.nomitem.toLowerCase().indexOf(args.toLowerCase())>-1||item.descrip.toLowerCase().indexOf(args.toLowerCase())>-1

      ){
        resultPosts.push(item);

      }
    } 
    return resultPosts;
  }
}
