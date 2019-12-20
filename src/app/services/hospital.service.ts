import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private url: BaseUrlProvider, private http: HttpClient) { }


  addNewHospital = (hospital) => {
    if (hospital.hospId == undefined)
      return this.http.post(`${this.url.apiBaseUrl}hospital/addHospital`, hospital);
    else
    console.log("from hospital service "+hospital.hospId)
      return this.http.put(`${this.url.apiBaseUrl}hospital/updateHospital`, hospital)
  }

  getAllHospital = () => {
    return this.http.get(`${this.url.apiBaseUrl}hospital/allHospitals`);
  }

  editHopital = (hospital) => {
    return this.http.put(`${this.url.apiBaseUrl}hospital/updateHospital`, hospital)
  }
  deleteHospital = (hospital) => {
    return this.http.delete(`${this.url.apiBaseUrl}hospital/deleteHospital/${hospital.hospId}`);
  }

  getOneHospital = (hospital) => {
    return this.http.get(`${this.url.apiBaseUrl}hospital/hospitalId/${hospital.hospId}`);
  }

}

