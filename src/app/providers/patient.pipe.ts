import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../models/patient';
import { utf8Encode } from '@angular/compiler/src/util';

@Pipe({
  name: 'filter'
})
export class PatientPipe implements PipeTransform {

  transform(patient: Patient[], search: string): Patient[] {
    if (!patient) return [];
    if (!search) return patient;
    search = search.toLowerCase();
    return patient.filter(pnt => {
        return pnt.name.toLowerCase().includes(search);

    });
}
}
