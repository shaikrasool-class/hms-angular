import { Component, OnInit } from "@angular/core";
import { BedService } from "../services/bed.service";
import { ToastrProvider } from '../providers/toastr.service';
import { Bed } from "../models/bed";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
declare var swal: any;
@Component({
  selector: "app-bed-list",
  templateUrl: "./bed-list.component.html",
  styleUrls: ["./bed-list.component.css"]
})
export class BedListComponent implements OnInit {
  bed = new Bed();
  beds: any = [];

  constructor(
    private bedService: BedService,
    private toastrService:ToastrProvider,
    ) {}

  ngOnInit() {
    this.getAllBeds();
  }
  getAllBeds = () => {
    this.bedService.getAllBeds().subscribe(
      response => {
        this.beds = response;
      },
      error => {
        console.log(error);
      }
    );
  };

  addNewBed = () => {

    this.bed = new Bed();


  }

  saveBed = (bed) => {
    this.bedService.addNewBed(this.bed).subscribe((response) => {
      if(response != null){
        if(this.bed.bed_Id == undefined) {
          this.toastrService.successmsg(bed.bed_Id+" added successfully..");
        }
        else{
          this.toastrService.successmsg(bed.name+" updated successfully...")
        }
        this.getAllBeds();
      }
    },(error) => {
      alert(error.error.errors[0]);
    } )
  }



  editBed = (bed) => {
    console.log(bed)
    this.bed = bed;
    this.bedService.editBed(bed).subscribe(response => {
      this.getAllBeds();
    },(error) => {
      console.log("something is wrong")
      alert(error.error.error[0]);
    })
  }

  deleteBed = (bed) => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((response) => {
      this.bedService.deleteBed(bed).subscribe(response => {
        this.toastrService.successmsg("Bed deleted successfully..");
        this.getAllBeds();
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
