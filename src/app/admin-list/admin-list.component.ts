import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin';
import { AdminService } from '../services/admin.service';
import { ToastrProvider } from '../providers/toastr.service';
import { collectExternalReferences } from '@angular/compiler';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {


  admin = new Admin();
  adminsPro: any=[]
  constructor(private adminService: AdminService, private toastrService: ToastrProvider ) { }

  ngOnInit() {
    this.getAdmin();
  }

  addNewA = () => {
    this.admin=new Admin();
  }
  saveAdmin = (admin) => {
    console.log("admin id from component "+admin.id)
    this.adminService.addNewAdmin(admin).subscribe((response) => {
      if (response != null) {
        if (this.admin.id == undefined ) {
          this.toastrService.successmsg("New admin added successfully..");
        }
        else {
          this.toastrService.successmsg(admin.adminName+" admin updated successfully..");
        }
        this.getAdmin();
      }

    }, (error) => {
      console.log("admin id "+admin.id)
      alert(error.error.errors[0]);
    })
  }
  getAdmin = () => {
    this.adminService.getAllAdmin().subscribe((response) =>{
      this.adminsPro=response;
    },
    (error) => {
      console.log(error);
    })
  }

  editAdmin = (admin) => {
    this.admin= admin;
    this.adminService.editAdmin(admin).subscribe(response => {
      this.getAdmin();

    }, (error)=>{
      alert(error.error.error[0]);
    })
  }



  }


