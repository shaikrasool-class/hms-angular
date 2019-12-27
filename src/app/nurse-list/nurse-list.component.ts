import { Component, OnInit, Input } from '@angular/core';
import { Nurse } from '../models/nurse';
import { NurseService } from '../services/nurse.service';
import { ToastrProvider } from '../providers/toastr.service';
import { HospitalService } from '../services/hospital.service';
import { Hospital } from '../models/hospital';
declare var swal: any;
@Component({
  selector: 'app-nurse-list',
  templateUrl: './nurse-list.component.html',
  styleUrls: ['./nurse-list.component.css']
})
export class NurseListComponent implements OnInit {

  nurse = new Nurse();
  hospital = new Hospital();
  nurs: any = [];
  search : any;

  constructor(private nurseService:NurseService, private toastrService:ToastrProvider) { }

  ngOnInit() {
    this.getNurse();
  }

  addNew = () => {
    this.nurse=new Nurse();
    }
  getNurse = () => {
    this.nurseService.getAllNurses().subscribe((response) => {
      this.nurs=response;
    },(error) => {
      console.log(error);
    })
  }
saveNurse = (nurse) => {
  this.nurseService.addNewNurse(this.nurse).subscribe((response) => {
    if(response != null){
      if(this.nurse.nId == undefined) {
        this.toastrService.successmsg(nurse.name+" added successfully..");
      }
      else{
        this.toastrService.successmsg(nurse.name+" updated successfully...")
      }
      this.getNurse();
    }
  },(error) => {
    alert(error.error.errors[0]);
  } )
}
  editNurse = (nurse) => {
    console.log(nurse)
    this.nurse = nurse;
    this.nurseService.editNurse(nurse).subscribe(response => {
      this.getNurse();
    }, (error) => {
      alert(error.eroor.error[0]);
    }
    )
  }
  deleteNurse = (nurse) => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((response) => {
      this.nurseService.deleteNurse(nurse).subscribe(response => {
        this.toastrService.successmsg("Nurse deleted successfully..");
        this.getNurse();
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
