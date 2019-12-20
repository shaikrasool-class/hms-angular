import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private url:BaseUrlProvider, private http:HttpClient ) { }

getAllDoctors = () => {

  return this.http.get(`${this.url.apiBaseUrl}doctor/allDoctors`);
}

addNewDoctor = (doctor) => {

  if(doctor.drId == undefined)
    return this.http.post(`${this.url.apiBaseUrl}doctor/saveDoctor`, doctor);
  else
  return this.http.put(`${this.url.apiBaseUrl}doctor/updateDoctor`, doctor)

}

editDoctor = (doctor) => {
  return this.http.put(`${this.url.apiBaseUrl}doctor/updateDoctor`, doctor)
}
deleteDoctor = (doctor) => {
  return this.http.delete(`${this.url.apiBaseUrl}doctor/deleteDoctor/${doctor.drId}`);
}
getOneDoctor= (doctor) => {
  return this.http.get(`${this.url.apiBaseUrl}doctor/doctorId${doctor.id}`)
}
}
