import { Component, OnInit } from "@angular/core";
import { BloodDonorService } from "../services/blood-donor.service";
import { ToastrProvider } from '../providers/toastr.service';
import { BloodDonor } from "../models/bloodDonor";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
declare var swal: any;

@Component({
  selector: 'app-blood-donor',
  templateUrl: './blood-donor.component.html',
  styleUrls: ['./blood-donor.component.css']
})
export class BloodDonorComponent implements OnInit {

  bloodDonor = new BloodDonor();
  blood: any = [];

  constructor(
    private bloodDonorService: BloodDonorService,
    private toastrService:ToastrProvider,

  ) { }

  ngOnInit() {
    this.getAllDonors();
  }

  getAllDonors = () => {

    this.bloodDonorService.getAllBloodDonors().subscribe((response) => {
     this.blood = response;
     console.log(response);
   },
   (error) => {
     console.log(error);
   })

 }

  addNewBloodDonor = () => {
    this.bloodDonor = new BloodDonor();
  }

  saveBloodDonor = (bloodDonor) => {
    this.bloodDonorService.addNewBloodDonor(this.bloodDonor).subscribe((response) => {
      if(response != null){
        if(this.bloodDonor.donorId == undefined) {
          this.toastrService.successmsg(bloodDonor.donorId+" added successfully..");
        }
        else{
          this.toastrService.successmsg(bloodDonor.donorId+" updated successfully...")
        }
        this.getAllDonors();
      }
    },(error) => {
      alert(error.error.errors[0]);
    } )
  }

  editBloodDonor = (bloodDonor) => {
    this.bloodDonor = bloodDonor;
    this.bloodDonorService.editBloodDonor(bloodDonor).subscribe(response => {
      this.getAllDonors();
    },(error) => {
      console.log("something is wrong")
      alert(error.error.error[0]);
    })
  }

  deleteBloodDonor = (bloodDonor) => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((response) => {
      this.bloodDonorService.deleteBed(bloodDonor).subscribe(response => {
        this.toastrService.successmsg("Blood donor deleted successfully..");
        this.getAllDonors();
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
