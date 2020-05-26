import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'advancedFilter',
  pure: false
})
@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any, term: string, props: any[] = []): any {
    if (!term || !items) return items;

    return FilterPipe.filter(items, term, props);
  }

  /**
   *
   * @param items List of items to filter
   * @param term  a string term to compare with every property of the list
   *
   */
  static filter(items: Array<{ [key: string]: any }>, term: string, keysToExclude): Array<{ [key: string]: any }> {

    const toCompare = term.toLowerCase();

    function checkInside(item: any, term: string) {
      for (let property in item) {
        if (item[property] === null || item[property] == undefined) {
          continue;
        }
        if (typeof item[property] === 'object' && keysToExclude.includes(property)) {
          if (checkInside(item[property], term)) {
            return true;
          }
        }
        if (item[property].toString().toLowerCase().includes(toCompare) && keysToExclude.includes(property)) {
          return true;
        }
      }
      return false;
    }

    return items.filter(function (item) {
      return checkInside(item, term);
    });
  }

}
