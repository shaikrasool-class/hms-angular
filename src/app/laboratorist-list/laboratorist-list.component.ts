import { Component, OnInit, Input } from '@angular/core';
import { ToastrProvider } from '../providers/toastr.service';
import { LaboratoristService } from '../services/laboratorist.service';
import { Laboratorist } from '../models/laboratorist';
declare var swal: any;
@Component({
  selector: 'app-laboratorist-list',
  templateUrl: './laboratorist-list.component.html',
  styleUrls: ['./laboratorist-list.component.css']
})
export class LaboratoristListComponent implements OnInit {

  laboratorist = new Laboratorist();

  lab: any = [];

  search : any;

  constructor(private labService:LaboratoristService, private toastrService:ToastrProvider) { }

  ngOnInit() {
    this.getLaboratorist();
  }

  addNew = () => {
    this.laboratorist=new Laboratorist();
    }
    getLaboratorist = () => {
    this.labService.getAllLaboratorist().subscribe((response) => {
      console.log(response);
      this.lab = response;
    },(error) => {
      console.log(error);
    })
  }
saveLaboratorist = (laboratorist) => {
  this.labService.addNewLaboratorist(this.laboratorist).subscribe((response) => {
    if(response != null){
      if(this.laboratorist.labId == undefined) {
        this.toastrService.successmsg(laboratorist.name+" added successfully..");
      }
      else{
        this.toastrService.successmsg(laboratorist.name+" updated successfully...")
      }
      this.getLaboratorist();
    }
  },(error) => {
    alert(error.error.errors[0]);
  } )
}
  editLaboratorist = (laboratorist) => {
    console.log(laboratorist)
    this.laboratorist = laboratorist;
    this.labService.editLaboratorist(laboratorist).subscribe(response => {
      this.getLaboratorist();
    }, (error) => {
      alert(error.eroor.error[0]);
    }
    )
  }
  deleteLaboratorist = (laboratorist) => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((response) => {
      this.labService.deleteLaboratorist(laboratorist).subscribe(response => {
        this.toastrService.successmsg("Laboratorist deleted successfully..");
        this.getLaboratorist();
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
