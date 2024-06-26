import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fiterpipe'
})
export class FiterpipePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    
    searchText = searchText.toLowerCase();

    return items.filter(it => {
      if (it && it.title && typeof it.title === 'string') {
        return it.title.toLowerCase().includes(searchText);
      }
      return false;
    });
  }
}
