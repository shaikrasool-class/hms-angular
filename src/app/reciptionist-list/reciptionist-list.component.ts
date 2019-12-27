import { Component, OnInit, Input } from '@angular/core';
import { Reciptionist } from '../models/reciptionist';
import { ReciptionistService } from '../services/reciptionist.service';
import { ToastrProvider } from '../providers/toastr.service';
declare var swal: any;
@Component({
  selector: 'app-reciptionist-list',
  templateUrl: './reciptionist-list.component.html',
  styleUrls: ['./reciptionist-list.component.css']
})
export class ReciptionistListComponent implements OnInit {

  reciptionist = new Reciptionist();
  recip: any = [];
  search : any;

  constructor(private reciptionistService:ReciptionistService, private toastrService:ToastrProvider) { }

  ngOnInit() {
    this.getReciptionist();
  }

  addNew = () => {
    this.reciptionist=new Reciptionist();
    }
    getReciptionist = () => {
    this.reciptionistService.getAllReciptionists().subscribe((response) => {
      this.recip=response;
    },(error) => {
      console.log(error);
    })
  }
saveReciptionist = (reciptionist) => {
  this.reciptionistService.addNewReciptionist(this.reciptionist).subscribe((response) => {
    if(response != null){
      if(this.reciptionist.recpId == undefined) {
        this.toastrService.successmsg(reciptionist.name+" added successfully..");
      }
      else{
        this.toastrService.successmsg(reciptionist.name+" updated successfully...")
      }
      this.getReciptionist();
    }
  },(error) => {
    alert(error.error.errors[0]);
  } )
}
  editReciptionist = (reciptionist) => {
    console.log(reciptionist)
    this.reciptionist = reciptionist;
    this.reciptionistService.editReciptionist(reciptionist).subscribe(response => {
      this.getReciptionist();
    }, (error) => {
      alert(error.eroor.error[0]);
    }
    )
  }
  deleteReciptionist = (reciptionist) => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((response) => {
      this.reciptionistService.deleteReciptionist(reciptionist).subscribe(response => {
        this.toastrService.successmsg("Reciptionist deleted successfully..");
        this.getReciptionist();
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
