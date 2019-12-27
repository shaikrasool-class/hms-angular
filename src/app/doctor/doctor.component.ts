import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { ToastrProvider } from '../providers/toastr.service';
import { Patient } from '../models/patient';
import { DoctorService } from '../services/doctor.service';
declare var swal: any;
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private patientService:PatientService, private doctorService:DoctorService, private toastrService: ToastrProvider) { }

  patient = new Patient();
  pnt: any = [];

  ngOnInit() {
    this.getPatients();
  }
  getPatients() {
  this.pnt = this.doctorService.patientList;

  }




  savePatient =(patient) =>{
    this.patientService.addNewPatient(this.patient).subscribe ((response) => {

      if(this.patient.pid == undefined){
        this.toastrService.successmsg("patient added successfully");
      }
      else{
        this.toastrService.successmsg(patient.name +"patient updated successfully")
      }
      this.getPatients();

    })
  }

  editPatient = (patient) => {
    console.log(patient)
        this.patient  = patient;
        this.patientService.editPatient(patient).subscribe(response => {
          this.getPatients();
        }, (error) => {
          alert(error.eroor.error[0]);
        })
      }

  deletePatient = (patient) => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((response) => {
      this.patientService.deletePatient(patient).subscribe(response => {
        this.toastrService.successmsg("Doctor deleted successfully..");
        this.getPatients();
      },
        error => {
          this.toastrService.infotoastr(error.error);
        })
    },
      (error) => {
        this.toastrService.infotoastr("You canceled your choice");
      })
  }
  printPdf = (patient) =>{
    this.patient=patient;
    this.patientService.getPdf(patient).subscribe(response => {
      this.getPatients();
      console.log("pdf printed")

    },
    (error) => {
      console.log("something is wrong in downloading pdf")
      console.log(error);
    })
  }
}
