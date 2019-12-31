import { Component, OnInit } from "@angular/core";
import { BedallotmentService } from "../services/bedallotment.service";
import { ToastrProvider } from '../providers/toastr.service';
import { BedAllotment } from "../models/bedallotment";
import { PatientService } from '../services/patient.service';
import { BedService } from '../services/bed.service';


@Component({
  selector: 'app-bed-allotment',
  templateUrl: './bed-allotment.component.html',
  styleUrls: ['./bed-allotment.component.css']
})
export class BedAllotmentComponent implements OnInit {
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


}
