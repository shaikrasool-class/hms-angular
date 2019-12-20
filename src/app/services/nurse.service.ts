import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  constructor(private url:BaseUrlProvider, private  http:HttpClient) { }

  addNewNurse = (nurse) => {
    if(nurse.nId == undefined){
      return this.http.post(`${this.url.apiBaseUrl}nurse/addNurse`, nurse);
    }
    else{
      return this.http.put(`${this.url.apiBaseUrl}nurse/updateNurse`, nurse);
    }
  }
  getOneNurse = (nurse) => {
    return this.http.get(`${this.url.apiBaseUrl}nurse/nurseId/${nurse.nId}`);
  }
  getAllNurses (){
    return this.http.get(`${this.url.apiBaseUrl}nurse/allNurses`);
  }
  editNurse= (nurse) => {
    return this.http.put(`${this.url.apiBaseUrl}nurse/updateNurse`, nurse);
  }
  deleteNurse = (nurse) => {
    return this.http.delete(`${this.url.apiBaseUrl}nurse/nurseId/${nurse.nId}`);
  }

}
