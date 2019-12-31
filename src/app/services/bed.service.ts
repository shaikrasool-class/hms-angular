import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";
import { isDefined } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class BedService {


  constructor(private url:BaseUrlProvider, private http:HttpClient){ }

addNewBed =(bed) =>{
  if(bed.bed_Id == undefined)
  return this.http.post(`${this.url.apiBaseUrl}bed/createBed`, bed);
  else
  return this.http.put(`${this.url.apiBaseUrl}bed/updateBed`, bed);
}
getAllBeds = () => {
  return this.http.get(`${this.url.apiBaseUrl}bed/allBeds`);
  }
editBed = (bed) =>{
    return this.http.put(`${this.url.apiBaseUrl}bed/updateBed`, bed);
  }
deleteBed = (bed) => {
      return this.http.delete(`${this.url.apiBaseUrl}bed/deleteBed/${bed.bed_Id}`);
  }


}
