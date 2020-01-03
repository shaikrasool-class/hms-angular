import { Component, OnInit } from "@angular/core";
import { MedicineCategoryService } from "../services/medicine-category.service";
import { ToastrProvider } from '../providers/toastr.service';
import { MedicineCategory } from "../models/medicineCategory";

declare var swal: any;
@Component({
  selector: 'app-medicine-category',
  templateUrl: './medicine-category.component.html',
  styleUrls: ['./medicine-category.component.css']
})
export class MedicineCategoryComponent implements OnInit {

  medicineCategory = new MedicineCategory();

  medicine: any = [];

  constructor(
    private medicineCategoryService: MedicineCategoryService,
    private toastrService:ToastrProvider,

  ) { }

  ngOnInit() {
this.getAllMedicineCategories();
  }
  getAllMedicineCategories = () => {

    this.medicineCategoryService.getAllMedicineCategories().subscribe((response) => {
     this.medicine = response;
     console.log(response);
   },
   (error) => {
     console.log(error);
   })
 }
 addNewMedicineCategory = () => {
  this.medicineCategory = new MedicineCategory();
}
saveMedicineCategory = (medicineCategory) =>{
  this.medicineCategoryService.createMedicine(this.medicineCategory).subscribe ((response) => {
    if(response !=null) {
      if(this.medicineCategory.medId == undefined){
        this.toastrService.successmsg(" pharmacist added successfully");
       }
    else{
      this.toastrService.successmsg(" pharmacist updated successfully")
    }
    this.getAllMedicineCategories();
  }
  },(error) => {
    alert(error.error.error[0])
 })
}

editMedicineCategory = (medicineCategory) => {
  this.medicineCategory = medicineCategory;
  this.medicineCategoryService.editMedicine(medicineCategory).subscribe(response => {
    this.getAllMedicineCategories();
  },(error) => {
    console.log("something is wrong")
    alert(error.error.error[0]);
  })
}

deleteMedicineCategory = (medicineCategory) => {
  swal({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((response) => {
    this.medicineCategoryService.deleteMedicine(medicineCategory).subscribe(response => {
      this.toastrService.successmsg("Medicine Category deleted successfully..");
      this.getAllMedicineCategories();
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
