import { Pipe, PipeTransform } from '@angular/core';
import { utf8Encode } from '@angular/compiler/src/util';
import { Doctor } from '../models/doctor';
@Pipe({
    name: 'filter'
})
export class SearchPipe implements PipeTransform {
    transform(items: Doctor[], search: string): Doctor[] {
        if (!items) return [];
        if (!search) return items;
        search = search.toLowerCase();
        return items.filter(it => {
            return it.email.toLowerCase().includes(search)||it.name.toLowerCase().includes(search)
            ||it.phone.toString().includes(search)||it.drId.toString().includes(search);
        });
    }
}
