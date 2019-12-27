import { Pipe, PipeTransform } from '@angular/core';
import { Laboratorist } from '../models/laboratorist';
import { utf8Encode } from '@angular/compiler/src/util';

@Pipe({
  name: 'filter'
})
export class LaboratoristPipe implements PipeTransform {
  transform(laboratorist: Laboratorist[], search: string): Laboratorist[] {
    if (!laboratorist) return [];
    if (!search) return laboratorist;
    search = search.toLowerCase();
    return laboratorist.filter(lab => {
        return lab.name.toLowerCase().includes(search);

    });
}
}
