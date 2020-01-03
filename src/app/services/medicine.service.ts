import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private url:BaseUrlProvider, private  http:HttpClient) { }

  createMedicine = (medicine) => {
    if(medicine.medicine_Id == undefined){
      return this.http.post(`${this.url.apiBaseUrl}medicine/createMedicine`, medicine);
    }
    else{
      return this.http.put(`${this.url.apiBaseUrl}medicine/updateMedicine`, medicine);
    }
  }
  getAllMedicines = () => {
    return this.http.get(`${this.url.apiBaseUrl}medicine/allMedicines`);
  }
  editMedicine = (medicine) =>{
    return this.http.put(`${this.url.apiBaseUrl}medicine/updateMedicine`, medicine);
  }
  deleteMedicine = (medicine) =>{
    return this.http.delete(`${this.url.apiBaseUrl}medicine/medicine/${medicine.medicine_Id}`);
  }
}
