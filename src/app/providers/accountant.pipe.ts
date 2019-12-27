import { Pipe, PipeTransform } from '@angular/core';
import { Accountant } from '../models/accountant';
import { utf8Encode } from '@angular/compiler/src/util';

@Pipe({
  name: 'filter'
})
export class AccountantPipe implements PipeTransform {

  transform(accountant: Accountant[], search: string): Accountant[] {
    if (!accountant) return [];
    if (!search) return accountant;
    search = search.toLowerCase();
    return accountant.filter(account => {
        return account.name.toLowerCase().includes(search);

    });
}

}
