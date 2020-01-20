import { Component, OnInit } from '@angular/core';
import { DoctorAppointmentService } from "../services/doctor-appointment.service";
import { PatientService } from '../services/patient.service';
import { DoctorService } from '../services/doctor.service';
import { ToastrProvider } from '../providers/toastr.service';
import { DoctorAppointment } from "../models/doctorAppointment";
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

declare var swal: any;

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent implements OnInit {

  doctorAppointment = new DoctorAppointment()
  appointment : any = [];
  pnt: any = [];
  dr: any = [];

  constructor(
    private doctorAppointmentService: DoctorAppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private toastrService:ToastrProvider,) { }

  ngOnInit() {

    this.getPatient();
    this.getAllAppointments();
    this.getAllDoctors();
  }

  getPatient = () => {
    this.patientService.getAllPatients().subscribe((response) => {
      this.pnt=response;
    },
    (error) => {
      console.log(error);
    })
  }
  getAllDoctors = () => {

    this.doctorService.getAllDoctors().subscribe((response) => {
     this.dr = response;
     console.log(response);
   },
   (error) => {
     console.log(error);
   })

 }
  getAllAppointments = () => {
    this.doctorAppointmentService.getAllAppointments().subscribe((response) => {
      this.appointment= response;
    },
    (error) => {
      console.log(error);
    })
  }


  addNewApointment = () => {
    this.doctorAppointment = new DoctorAppointment();
  }

  saveAppointment = (doctorAppointment) => {
    this.doctorAppointmentService.addNewAppointment(this.doctorAppointment).subscribe((response) => {
      if(response != null){
        if(this.doctorAppointment.drAppId == undefined) {
          this.toastrService.successmsg(doctorAppointment.drAppId+" added successfully..");
        }
        else{
          this.toastrService.successmsg(doctorAppointment.drAppId+" updated successfully...")
        }
        this.getAllAppointments();
      }
    },(error) => {
      alert(error.error.errors[0]);
    } )
  }

  editAppointment = (doctorAppointment) => {
    console.log(doctorAppointment);
    this.doctorAppointment = doctorAppointment;
    this.doctorAppointmentService.editAppointment(doctorAppointment).subscribe(response => {
      this.getAllAppointments();
    },(error) => {
      console.log("something is wrong")
      alert(error.error.error[0]);
    })
  }

  deleteBedAllotment = (doctorAppointment) => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((response) => {
      this.doctorAppointmentService.deleteAppointment(doctorAppointment).subscribe(response => {
        this.toastrService.successmsg("appointment deleted successfully..");
        this.getAllAppointments();
      },
        error => {
          this.toastrService.infotoastr(error.error);
        })
    },
      (error) => {
        this.toastrService.infotoastr("You canceled your choice");
      })
  }
}

