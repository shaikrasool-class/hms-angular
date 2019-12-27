import { Pipe, PipeTransform } from '@angular/core';
import { Reciptionist } from '../models/reciptionist';
import { utf8Encode } from '@angular/compiler/src/util';

@Pipe({
  name: 'filter'
})
export class ReciptionistPipe implements PipeTransform {

  transform(reciptionist: Reciptionist[], search: string): Reciptionist[] {
    if (!reciptionist) return [];
    if (!search) return reciptionist;
    search = search.toLowerCase();
    return reciptionist.filter(reciption => {
        return reciption.name.toLowerCase().includes(search);

    });
}

}
