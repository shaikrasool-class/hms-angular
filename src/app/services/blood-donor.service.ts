import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";
import { isDefined } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class BloodDonorService {

  constructor(private url:BaseUrlProvider, private http:HttpClient) { }

addNewBloodDonor = (blooddonor) =>{
  if(blooddonor.donorId == undefined)
  return this.http.post(`${this.url.apiBaseUrl}bloodDonor/createBloodDonor`, blooddonor);
  else
  return this.http.put(`${this.url.apiBaseUrl}bloodDonor/updateBloodDonor`, blooddonor);
}
getAllBloodDonors = () => {
  return this.http.get(`${this.url.apiBaseUrl}bloodDonor/getAllDonors`);
  }
editBloodDonor = (blooddonor) =>{
    return this.http.put(`${this.url.apiBaseUrl}bloodDonor/updateBloodDonor`, blooddonor);
  }
deleteBed = (blooddonor) => {
    return this.http.delete(`${this.url.apiBaseUrl}bloodDonor/deleteDonor/${blooddonor.donorId}`);
}

}
