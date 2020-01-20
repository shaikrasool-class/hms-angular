import { Component, OnInit } from '@angular/core';
import { BedallotmentService } from "../services/bedallotment.service";
import { BedAllotment } from "../models/bedallotment";
import { PatientService } from '../services/patient.service';
import { BedService } from '../services/bed.service';
import { ToastrProvider } from '../providers/toastr.service';
declare var swal: any;
@Component({
  selector: 'app-doctor-bed-allotment',
  templateUrl: './doctor-bed-allotment.component.html',
  styleUrls: ['./doctor-bed-allotment.component.css']
})
export class DoctorBedAllotmentComponent implements OnInit {

  bedallotment = new BedAllotment();
  beds: any = [];
  pnt: any = [];
  bed: any = [];
  constructor(
    private bedAllotmentService: BedallotmentService,
    private patientService: PatientService,
    private bedService: BedService,
    private toastrService:ToastrProvider,
    ) {}

  ngOnInit() {
    this.getAllBedAllotments();
    this.getPatient();
    this.getAllBeds();
  }
  getAllBedAllotments = () => {
    this.bedAllotmentService.getAllBedAllotments().subscribe((response) => {
      console.log(response);
      this.beds = response;
    },(error) => {
      console.log(error);
    })
  }
  getPatient = () => {
    this.patientService.getAllPatients().subscribe((response) => {
      this.pnt=response;
    },
    (error) => {
      console.log(error);
    })
  }

  getAllBeds = () => {
    this.bedService.getAllBeds().subscribe(
      response => {
        this.bed = response;

      },
      error => {
        console.log(error);
      }
    );
  };

  addNewBedAllotment = () => {
    this.bedallotment = new BedAllotment();
  }
  saveBedAllotment = (bedallotment) => {
    this.bedAllotmentService.createBedAllotment(this.bedallotment).subscribe((response) => {
      if(response != null){
        if(this.bedallotment.bedId == undefined) {
          this.toastrService.successmsg(bedallotment.bedId+" added successfully..");
        }
        else{
          this.toastrService.successmsg(bedallotment.bedId+" updated successfully...")
        }
        this.getAllBedAllotments();
      }
    },(error) => {
      alert(error.error.errors[0]);
    } )
  }
  editBedAllotment = (bedallotment) => {
    console.log(bedallotment);
    this.bedallotment = bedallotment;
    this.bedAllotmentService.editBedAllotment(bedallotment).subscribe(response => {
      this.getAllBedAllotments();
    },(error) => {
      console.log("something is wrong")
      alert(error.error.error[0]);
    })
  }
  deleteBedAllotment = (bedallotment) => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((response) => {
      this.bedAllotmentService.deleteBedAllotment(bedallotment).subscribe(response => {
        this.toastrService.successmsg("Bed allotment deleted successfully..");
        this.getAllBedAllotments();
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
