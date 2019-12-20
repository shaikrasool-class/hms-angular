import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountantService {

  constructor(private url:BaseUrlProvider, private  http:HttpClient) { }

  addNewAccountant = (accountant) => {
    if(accountant.acId == undefined){
      return this.http.post(`${this.url.apiBaseUrl}accountant/addAccountant`, accountant);
    }
    else{
      return this.http.put(`${this.url.apiBaseUrl}accountant/updateAccountant`, accountant);
    }
  }
  getOneAccountant = (accountant) => {
    return this.http.get(`${this.url.apiBaseUrl}accountant/accountantId/${accountant.acId}`);
  }
  getAllAccountant (){
    return this.http.get(`${this.url.apiBaseUrl}accountant/allAccountant`);
  }
  editAccountant = (accountant) => {
    return this.http.put(`${this.url.apiBaseUrl}accountant/updateAccountant`, accountant);
  }
  deleteAccountant = (accountant) => {
    return this.http.delete(`${this.url.apiBaseUrl}accountant/accountantId/${accountant.acId}`);
  }

}
