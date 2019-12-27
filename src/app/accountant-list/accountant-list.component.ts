import { Component, OnInit, Input } from '@angular/core';
import { Accountant } from '../models/accountant';
import { AccountantService } from '../services/accountant.service';
import { ToastrProvider } from '../providers/toastr.service';
declare var swal: any;
@Component({
  selector: 'app-accountant-list',
  templateUrl: './accountant-list.component.html',
  styleUrls: ['./accountant-list.component.css']
})
export class AccountantListComponent implements OnInit {

  accountant = new Accountant();

  account: any = [];

  search : any;
  constructor(private accountantService:AccountantService, private toastrService:ToastrProvider) { }

  ngOnInit() {
    this.getAccountant();
  }

  addNew = () => {
    this.accountant = new Accountant();
    }
    getAccountant = () => {
    this.accountantService.getAllAccountant().subscribe((response) => {
      this.account = response;
    },(error) => {
      console.log(error);
    })
  }
saveAccountant = (accountant) => {
  this.accountantService.addNewAccountant(this.accountant).subscribe((response) => {
    if(response != null){
      if(this.accountant.acId == undefined) {
        this.toastrService.successmsg(accountant.name+" added successfully..");
      }
      else{
        this.toastrService.successmsg(accountant.name+" updated successfully...")
      }
      this.getAccountant();
    }
  },(error) => {
    alert(error.error.errors[0]);
  } )
}
  editAccountant = (accountant) => {
    console.log(accountant)
    this.accountant = accountant;
    this.accountantService.editAccountant(accountant).subscribe(response => {
      this.getAccountant();
    }, (error) => {
      alert(error.eroor.error[0]);
    }
    )
  }
  deleteAccountant = (accountant) => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((response) => {
      this.accountantService.deleteAccountant(accountant).subscribe(response => {
        this.toastrService.successmsg("accountant deleted successfully..");
        this.getAccountant();
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
