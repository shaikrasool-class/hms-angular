import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private url: BaseUrlProvider, private http: HttpClient) { }

addNewPatient = (patient) =>{
  if(patient.pid == undefined){
      return this.http.post(`${this.url.apiBaseUrl}patient/addPatient`, patient);
  }
  else{
      return this.http.put(`${this.url.apiBaseUrl}patient/updatePatient`, patient);
  }
}
getAllPatients(){
  return this.http.get(`${this.url.apiBaseUrl}patient/allPatients`);
}
editPatient = (patient) => {
  return this.http.put(`${this.url.apiBaseUrl}patient/updatePatient`, patient);
}
getOnePatient = (patient) => {
  return this.http.get(`${this.url.apiBaseUrl}patient/patientId/${patient.pid}`);
}
deletePatient = (patient) => {
  return this.http.delete(`${this.url.apiBaseUrl}patient/patientId/${patient.pid}`);
}
getPdf = (patient) => {
  return this.http.get(`${this.url.apiBaseUrl}patient/pdf/${patient.pid}`);
}

}
