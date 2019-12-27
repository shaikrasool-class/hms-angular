import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../services/hospital.service';
import { ToastrProvider } from '../providers/toastr.service';
import { Hospital } from '../models/hospital';
declare var swal: any;
@Component({
  selector: 'app-manage-hospital',
  templateUrl: './manage-hospital.component.html',
  styleUrls: ['./manage-hospital.component.css']
})
export class ManageHospitalComponent implements OnInit {

  hospital = new Hospital();
  users: any = [];
   search : any;

  constructor(private hospitalService: HospitalService, private toastrService: ToastrProvider) { }

  ngOnInit() {

    this.getHospital();
  }

  addNew = () => {
    this.hospital = new Hospital();
  }

  getHospital = () => {
    this.hospitalService.getAllHospital().subscribe((response) => {
      this.users = response;
    },
      (error) => {
        console.log(error);
      })
  }

  saveHospital = (hospital) => {
    this.hospitalService.addNewHospital(this.hospital).subscribe((response) => {

      if (response != null) {
        if (this.hospital.hospId == undefined) {
          this.toastrService.successmsg("New hospital added successfully..");
        }
        else {
          this.toastrService.successmsg(hospital.name+" hospital updated successfully..");
        }
        this.getHospital();
      }

    }, (error) => {
      alert(error.error.errors[0]);
    })
  }


  editHospital = (hospital) => {
    console.log(hospital  )
    this.hospital = hospital;
    this.hospitalService.editHopital(hospital).subscribe(response => {
      this.getHospital();
    }, (error) => {
      alert(error.eroor.error[0]);
    })
  }

  deleteHospital = (hospital) => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((response) => {
      this.hospitalService.deleteHospital(hospital).subscribe(response => {
        this.toastrService.successmsg("Hospital deleted successfully..");
        this.getHospital();
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
