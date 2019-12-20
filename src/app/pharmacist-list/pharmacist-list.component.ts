import { Component, OnInit } from '@angular/core';
import { Pharmacist } from '../models/pharmacist';
import { PharmacistService } from '../services/pharmacist.service';
import { ToastrProvider } from '../providers/toastr.service';
declare var swal: any;
@Component({
  selector: 'app-pharmacist-list',
  templateUrl: './pharmacist-list.component.html',
  styleUrls: ['./pharmacist-list.component.css']
})
export class PharmacistListComponent implements OnInit {

  pharmacist = new Pharmacist();

  pharma: any = [];

  constructor(private pharmacistService:PharmacistService,private toastrService: ToastrProvider) { }

  ngOnInit() {

    this.getPharmacist();
  }

  addNew = () => {
    this.pharmacist = new Pharmacist();
  }

  getPharmacist = () => {
    this.pharmacistService.getAllPharmacists().subscribe ((response) => {
      this.pharma = response;
    },
      (error) => {
        console.log(error);
      })
    }


    savePharmacist = (pharmacist) =>{
      this.pharmacistService.addNewPharmacist(this.pharmacist).subscribe ((response) => {
        if(response !=null) {
          if(this.pharmacist.phId == undefined){
            this.toastrService.successmsg(" pharmacist added successfully");
           }
        else{
          this.toastrService.successmsg(" pharmacist updated successfully")
        }
        this.getPharmacist();
      }
      },(error) => {
        alert(error.error.error[0])
     })
    }


    editPharmacist = (pharmacist) => {
      this.pharmacist = pharmacist;
      this.pharmacistService.editPharmacist(pharmacist).subscribe(response => {
        this.getPharmacist();
      },(error) => {
        console.log("something is wrong")
        alert(error.error.error[0]);
      })
    }
    deletePharmacist = (pharmacist) => {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((response) => {
        this.pharmacistService.deletePharmacist(pharmacist).subscribe(response => {
          this.toastrService.successmsg("Doctor deleted successfully..");
          this.getPharmacist();
        },
          error => {
            this.toastrService.infotoastr(error.error);
          })
      },
        (error) => {
          this.toastrService.infotoastr("You canceled your choice");
        })
    }

    printPdf = (pharmacist) =>{
      this.pharmacist=pharmacist;
      this.pharmacistService.getPdf(pharmacist).subscribe(response => {
        this.getPharmacist();
        console.log("pdf printed")

      },
      (error) => {
        console.log("something is wrong in downloading pdf")
        console.log(error);
      })
    }
}
