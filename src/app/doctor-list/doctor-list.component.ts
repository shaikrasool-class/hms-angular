import { Component, OnInit,Input } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { ToastrProvider } from '../providers/toastr.service';
import { Doctor } from '../models/doctor';
import { Router } from '@angular/router';

declare var swal: any;
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  doctor = new  Doctor();
  dr: any = [];
  search : any;

  constructor(private doctorService:DoctorService, private toastrService: ToastrProvider, private _router : Router ) { }

  ngOnInit() {

    this.getDoctor();

  }

  getDoctor = () => {

     this.doctorService.getAllDoctors().subscribe((response) => {
      this.dr = response;
      console.log(response);
    },
    (error) => {
      console.log(error);
    })

  }
  addNew = () => {

    this.doctor = new Doctor();


  }


  saveDoctor = (doctor) => {

    this.doctorService.addNewDoctor(this.doctor).subscribe((response) => {

      if(response !=null) {
        if(this.doctor.drId == undefined) {
          this.toastrService.successmsg("doctor added successfully..");
        }
        else{
          this.toastrService.successmsg(doctor.name+" updated successfully");
        }
        this.getDoctor();
      }
    },(error) => {
       alert(error.error.error[0])
    })
  }
editDoctor = (doctor) => {
  console.log(doctor)
  this.doctor = doctor;
  this.doctorService.editDoctor(doctor).subscribe(response => {
    this.getDoctor();
  },(error) => {
    console.log("something is wrong")
    alert(error.error.error[0]);
  })
}

deleteDoctor = (doctor) => {
  swal({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((response) => {
    this.doctorService.deleteDoctor(doctor).subscribe(response => {
      this.toastrService.successmsg("Doctor deleted successfully..");
      this.getDoctor();
    },
      error => {
        this.toastrService.infotoastr(error.error);
      })
  },
    (error) => {
      this.toastrService.infotoastr("You canceled your choice");
    })
}


getPatientList(d) {
  let patients = d.pntDtos;
  this.doctorService.patientList = patients;
  this._router.navigate(["/doctor"]);
}

}
