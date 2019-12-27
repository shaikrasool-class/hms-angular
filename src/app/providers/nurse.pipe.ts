import { Pipe, PipeTransform } from '@angular/core';
import { Nurse } from '../models/nurse';
import { utf8Encode } from '@angular/compiler/src/util';


@Pipe({
  name: 'filter'
})
export class NursePipe implements PipeTransform {

  transform(nurse: Nurse[], search: string): Nurse[] {
    if (!nurse) return [];
    if (!search) return nurse;
    search = search.toLowerCase();
    return nurse.filter(nr => {
        return nr.name.toLowerCase().includes(search);

    });
}
}
