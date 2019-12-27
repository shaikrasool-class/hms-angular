import { Pipe, PipeTransform } from '@angular/core';
import { Doctor } from '../models/doctor';
import { utf8Encode } from '@angular/compiler/src/util';
@Pipe({
    name: 'filter'
})
export class SearchPipe implements PipeTransform {
    transform(dr: Doctor[], search: string): Doctor[] {
        if (!dr) return [];
        if (!search) return dr;
        search = search.toLowerCase();
        return dr.filter(doctor => {
            return doctor.name.toLowerCase().includes(search)||doctor.deparment.toLowerCase().includes(search)
            ||doctor.drId.toString().includes(search)||doctor.email.toLowerCase().includes(search)
            ||doctor.phone.toLowerCase().includes(search);

        });
    }
}
