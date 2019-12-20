import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReciptionistService {

  constructor(private url:BaseUrlProvider, private  http:HttpClient) { }

  addNewReciptionist = (reciptionist) => {
    if(reciptionist.recpId == undefined){
      return this.http.post(`${this.url.apiBaseUrl}reciptionist/addReciptionist`, reciptionist);
    }
    else{
      return this.http.put(`${this.url.apiBaseUrl}reciptionist/updateReciptionist`, reciptionist);
    }
  }
  getOneReciptionist = (reciptionist) => {
    return this.http.get(`${this.url.apiBaseUrl}reciptionist/reciptionistId/${reciptionist.recpId}`);
  }
  getAllReciptionists (){
    return this.http.get(`${this.url.apiBaseUrl}reciptionist/allReciptionist`);
  }
  editReciptionist= (reciptionist) => {
    return this.http.put(`${this.url.apiBaseUrl}reciptionist/updateReciptionist`, reciptionist);
  }
  deleteReciptionist = (reciptionist) => {
    return this.http.delete(`${this.url.apiBaseUrl}reciptionist/reciptionistId/${reciptionist.recpId}`);
  }

}
