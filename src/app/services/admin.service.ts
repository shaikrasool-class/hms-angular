import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";
import { isDefined } from '@angular/compiler/src/util';



@Injectable({
  providedIn: 'root'
})


export class AdminService {

  constructor(private url:BaseUrlProvider, private http:HttpClient) { }


  addNewAdmin = (admin) => {
    if (admin.id == undefined)
    return this.http.post(`${this.url.apiBaseUrl}admin/saveAdmin`, admin);
    else
    console.log("from admin service "+admin.id)
    return this.http.put(`${this.url.apiBaseUrl}admin/updateAdmin`, admin)
  }
  


getAllAdmin = () => {
  return this.http.get(`${this.url.apiBaseUrl}admin/allAdmins`);
  }

editAdmin = (admin) =>{
    return this.http.put(`${this.url.apiBaseUrl}admin/updateAdmin`, admin)
  }

deleteAdmin = (admin) => {
      return this.http.delete(`${this.url.apiBaseUrl}admin/deleteAdmin/${ admin.id}`)
  }
  
}

