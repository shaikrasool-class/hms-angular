import { Time } from '@angular/common';

export class DoctorAppointment{

  drAppId?: number;
  createdAt:Date =new Date();
  appointmentDate: Date;
  appointmentStartTime: Time;
  patientName:string;
  doctorName:string;
  drId?:number;
}
