import { Pipe, PipeTransform } from '@angular/core';
import { Pharmacist } from '../models/pharmacist';
import { utf8Encode } from '@angular/compiler/src/util';
@Pipe({
  name: 'filter'
})
export class PharmacistPipe implements PipeTransform {

  transform(pharmacist: Pharmacist[], search: string): Pharmacist[] {
    if (!pharmacist) return [];
    if (!search) return pharmacist;
    search = search.toLowerCase();
    return pharmacist.filter(pharma => {
        return pharma.name.toLowerCase().includes(search);

    });
}

}
