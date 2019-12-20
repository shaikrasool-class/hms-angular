import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { ToastrProvider } from '../providers/toastr.service';
import { Doctor } from '../models/doctor';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private doctorService:DoctorService, private toastrService: ToastrProvider) { }
  doctor = new Doctor();
  doctors: any= [];
  ngOnInit() {
      this.getDoctor(this.doctor);
  }

  getDoctor = (doctor) =>{
    this.doctorService.getOneDoctor(this.doctor).subscribe((response)=> {
      if(this.doctor.drId !=undefined){
        this.doctors =response;
        this.toastrService.successmsg(this.doctor.name+ "updated successfully");
      }
    })
  }

  editDoctor = (doctor) => {
    console.log(doctor)
    this.doctor = doctor;
    this.doctorService.editDoctor(doctor).subscribe(response => {
      this.getDoctor(doctor);
    },(error) => {
      console.log("something is wrong")
      alert(error.error.error[0]);
    })
  }
}
