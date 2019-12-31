import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BedallotmentService {

  constructor(private url:BaseUrlProvider, private http:HttpClient) { }

  createBedAllotment = (bedallotment) => {

    if(bedallotment.bedId == undefined)
      return this.http.post(`${this.url.apiBaseUrl}bedAllotment/createBed`, bedallotment);
    else
    return this.http.put(`${this.url.apiBaseUrl}bedAllotment/updateBed`, bedallotment);

  }

  getAllBedAllotments = () => {
    return this.http.get(`${this.url.apiBaseUrl}bedAllotment/allBedAllotments`);
  }


  editBedAllotment = (bedallotment) =>{
    return this.http.put(`${this.url.apiBaseUrl}bedAllotment/updateBed`, bedallotment);
  }
  deleteBedAllotment = (bedallotment) =>{
    return this.http.delete(`${this.url.apiBaseUrl}bedAllotment/deletedBed/${bedallotment.bedId}`);
  }
}

