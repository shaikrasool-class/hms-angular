import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class MedicineCategoryService {

  constructor(private url:BaseUrlProvider, private  http:HttpClient) { }

  createMedicine = (medicine) => {
    if(medicine.medId == undefined){
      return this.http.post(`${this.url.apiBaseUrl}medicineCategory/createMedicine`, medicine);
    }
    else{
      return this.http.put(`${this.url.apiBaseUrl}medicineCategory/updateMedicine`, medicine);
    }
  }
  getAllMedicineCategories = () => {
    return this.http.get(`${this.url.apiBaseUrl}medicineCategory/allMedicineCategories`);
  }
  editMedicine = (medicine) =>{
    return this.http.put(`${this.url.apiBaseUrl}medicineCategory/updateMedicine`, medicine);
  }
  deleteMedicine = (medicine) =>{
    return this.http.delete(`${this.url.apiBaseUrl}medicineCategory/medicine/${medicine.medId}`);
  }





}
