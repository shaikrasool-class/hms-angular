import { Component, OnInit } from "@angular/core";
import { MedicineService } from "../services/medicine.service";
import { ToastrProvider } from '../providers/toastr.service';
import { Medicine } from "../models/medicine";
import { MedicineCategoryService } from '../services/medicine-category.service';

declare var swal: any;
@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {

  medicine = new Medicine();
  med: any = [];
  medicineCategories: any = [];

  constructor(
    private medicineService: MedicineService,
    private medicineCategoryService:MedicineCategoryService,
    private toastrService:ToastrProvider,
  ) { }

  ngOnInit() {
    this.getAllMedicines();
    this.getAllMedicineCategories();
  }

  getAllMedicineCategories = () => {

    this.medicineCategoryService.getAllMedicineCategories().subscribe((response) => {
     this.medicineCategories = response;
     console.log(response);
   },
   (error) => {
     console.log(error);
   })
 }

  getAllMedicines = () => {

    this.medicineService.getAllMedicines().subscribe((response) => {
     this.med = response;
     console.log(response);
   },
   (error) => {
     console.log(error);
   })
 }
 addNewMedicine = () => {
  this.medicine = new Medicine();
}
saveMedicine = (medicine) =>{
  this.medicineService.createMedicine(this.medicine).subscribe ((response) => {
    if(response !=null) {
      if(this.medicine.medicine_Id == undefined){
        this.toastrService.successmsg(" Medicine added successfully");
       }
    else{
      this.toastrService.successmsg(" Medicine updated successfully")
    }
    this.getAllMedicines();
  }
  },(error) => {
    alert(error.error.error[0])
 })
}

editMedicine = (medicine) => {
  this.medicine = medicine;
  this.medicineService.editMedicine(medicine).subscribe(response => {
    this.getAllMedicines();
  },(error) => {
    console.log("something is wrong")
    alert(error.error.error[0]);
  })
}

deleteMedicine = (medicine) => {
  swal({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((response) => {
    this.medicineService.deleteMedicine(medicine).subscribe(response => {
      this.toastrService.successmsg("Medicine deleted successfully..");
      this.getAllMedicines();
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
