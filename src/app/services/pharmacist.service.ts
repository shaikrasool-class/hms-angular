import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class PharmacistService {


  constructor(private url: BaseUrlProvider, private http: HttpClient) { }


  addNewPharmacist = (pharmacist) => {
    if(pharmacist.phId == undefined){
    return this.http.post(`${this.url.apiBaseUrl}pharmacist/savePharmacist`, pharmacist);
    }
    else{
    return this.http.put(`${this.url.apiBaseUrl}pharmacist/updatePharmacist`, pharmacist);
    }
  }

  getAllPharmacists(){
    return this.http.get(`${this.url.apiBaseUrl}pharmacist/allPharmacist`)
  }
  editPharmacist = (pharmacist) => {
    return this.http.put(`${this.url.apiBaseUrl}pharmacist/updatePharmacist`, pharmacist);
  }

  getOnePharmacist = (pharmacist) => {
    return this.http.get(`${this.url.apiBaseUrl}pharmacist/pharmacistId/${pharmacist.phId}`);
  }

  deletePharmacist = (pharmacist) => {
    return this.http.delete(`${this.url.apiBaseUrl}pharmacist/pharmacistId/${pharmacist.phId}`)
  }
  getPdf = (pharamcist) => {
    return this.http.get(`${this.url.apiBaseUrl}pharmacist/pdf/${pharamcist.pid}`);
  }
}
