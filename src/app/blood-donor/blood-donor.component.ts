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
}
