import { Injectable } from '@angular/core';
import { BaseUrlProvider } from '../providers/urls.service';
import { HttpClient } from "@angular/common/http";
import { isDefined } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class DoctorAppointmentService {

  constructor(private url:BaseUrlProvider, private http:HttpClient) { }


  addNewAppointment = (doctorappointment) =>{
    if(doctorappointment.drAppId == undefined)
    return this.http.post(`${this.url.apiBaseUrl}appointment/bookAppointment`, doctorappointment);
    else
    return this.http.put(`${this.url.apiBaseUrl}appointment/updateAppointemt`, doctorappointment);
  }
  getAllAppointments = () => {
    return this.http.get(`${this.url.apiBaseUrl}appointment/allAppointments`);
    }
  editAppointment = (doctorappointment) =>{
      return this.http.put(`${this.url.apiBaseUrl}appointment/updateAppointemt`, doctorappointment);
    }
  deleteAppointment = (doctorappointment) => {
      return this.http.delete(`${this.url.apiBaseUrl}appointment/deleteAppointment/${doctorappointment.drAppId}`);
  }


}
