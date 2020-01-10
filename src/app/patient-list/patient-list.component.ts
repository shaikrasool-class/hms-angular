import { Component, OnInit, Input} from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';
import { ToastrProvider } from '../providers/toastr.service';
import { Patient } from '../models/patient';
import { Doctor } from '../models/doctor';
declare var swal: any;
@Component({
  selector: 'app-patient',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patient = new Patient();

  pnt: any = [];

  search : any;

  doctor = new Doctor();
  dr : any = [];


  constructor(private patientService:PatientService,private toastrService: ToastrProvider,  private _router : Router ) { }

  ngOnInit() {
    this.getPatient();
  }

  getPatient = () => {
    this.patientService.getAllPatients().subscribe((response) => {
      this.pnt=response;
    },
    (error) => {
      console.log(error);
    })
  }
  addNew =() => {
   this.patient=new Patient();
  }

  savePatient =(patient) =>{
    this.patientService.addNewPatient(this.patient).subscribe ((response) => {

      if(this.patient.pid == undefined){
        this.toastrService.successmsg("patient added successfully");
      }
      else{
        this.toastrService.successmsg(patient.name +"patient updated successfully")
      }
      this.getPatient();

    })
  }

  editPatient = (patient) => {
    console.log(patient)
        this.patient  = patient;
        this.patientService.editPatient(patient).subscribe(response => {
          this.getPatient();
        }, (error) => {
          alert(error.eroor.error[0]);
        })
      }

  deletePatient = (patient) => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((response) => {
      this.patientService.deletePatient(patient).subscribe(response => {
        this.toastrService.successmsg("Doctor deleted successfully..");
        this.getPatient();
      },
        error => {
          this.toastrService.infotoastr(error.error);
        })
    },
      (error) => {
        this.toastrService.infotoastr("You canceled your choice");
      })
  }
  printPdf = (patient) =>{
    this.patient=patient;
    this.patientService.getPdf(patient).subscribe(response => {
      this.getPatient();
      console.log("pdf printed")

    },
    (error) => {
      console.log("something is wrong in downloading pdf")
      console.log(error);
    })
  }
  getPatientByDocotor (pt) {
    this._router.navigate(["/patient"]);
  }

}
