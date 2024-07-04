import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter11'
})
export class Filter11Pipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts =[] as  any;
    for(const item of value){
      if( item.nomitemSup.toLowerCase().indexOf(args.toLowerCase())>-1
      ||item.descripSup.toLowerCase().indexOf(args.toLowerCase())>-1
      ){
        resultPosts.push(item);

      }
    } 
    return resultPosts;
  }

}