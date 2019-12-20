import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LaboratoristService {

  constructor(private url:BaseUrlProvider, private  http:HttpClient) { }

  addNewLaboratorist = (laboratorist) => {
    if(laboratorist.labId == undefined){
      return this.http.post(`${this.url.apiBaseUrl}laboratorist/addLaboratorist`, laboratorist);
    }
    else{
      return this.http.put(`${this.url.apiBaseUrl}laboratorist/updateLaboratorist`, laboratorist);
    }
  }
  getOneLaboratorist = (laboratorist) => {
    return this.http.get(`${this.url.apiBaseUrl}laboratorist/LaboratoristId/${laboratorist.labId}`);
  }
  getAllLaboratorist (){
    return this.http.get(`${this.url.apiBaseUrl}laboratorist/allLaboratorist`);
  }
  editLaboratorist= (laboratorist) => {
    return this.http.put(`${this.url.apiBaseUrl}laboratorist/updateLaboratorist`, laboratorist);
  }
  deleteLaboratorist = (laboratorist) => {
    return this.http.delete(`${this.url.apiBaseUrl}laboratorist/LaboratoristId/${laboratorist.labId}`);
  }

}
