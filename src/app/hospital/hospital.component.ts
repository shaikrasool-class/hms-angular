import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { HospitalService } from '../services/hospital.service';
import { Hospital } from '../models/hospital';
import { Doctor } from '../models/doctor';
import { NurseService } from '../services/nurse.service';
import { PatientService } from '../services/patient.service';
import { PharmacistService } from '../services/pharmacist.service';
import { LaboratoristService } from '../services/laboratorist.service';
import { AccountantService } from '../services/accountant.service';
import { ReciptionistService } from '../services/reciptionist.service';
import * as $ from "jquery";

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  dr: any = [];
  nurs: any = [];
  pnt: any = [];
  pharma: any = [];
  lab: any = [];
  account: any = [];
  recip: any = [];
  constructor(private doctorService: DoctorService, private nurseService: NurseService,
    private patientService: PatientService, private pharmacistService: PharmacistService,
    private labService: LaboratoristService, private accountantService: AccountantService,
    private reciptionistService: ReciptionistService) { }

  ngOnInit() {
    this.getDoctor();
    this.getNurse();
    this.getPatient();
    this.getPharmacist();
    this.getLaboratorist();
    this.getAccountant();
    this.getReciptionist();
   }

  getDoctor = () => {

    this.doctorService.getAllDoctors().subscribe((response) => {
      this.dr = response;
      console.log(response);
    },
      (error) => {
        console.log(error);
      })

  }


  getNurse = () => {
    this.nurseService.getAllNurses().subscribe((response) => {
      this.nurs = response;
    }, (error) => {
      console.log(error);
    })
  }
  getPatient = () => {
    this.patientService.getAllPatients().subscribe((response) => {
      this.pnt = response;
    },
      (error) => {
        console.log(error);
      })
  }

  getPharmacist = () => {
    this.pharmacistService.getAllPharmacists().subscribe((response) => {
      this.pharma = response;
    },
      (error) => {
        console.log(error);
      })
  }
  getLaboratorist = () => {
    this.labService.getAllLaboratorist().subscribe((response) => {
      this.lab = response;
    }, (error) => {
      console.log(error);
    })
  }
  getAccountant = () => {
    this.accountantService.getAllAccountant().subscribe((response) => {
      this.account = response;
    }, (error) => {
      console.log(error);
    })
  }
  getReciptionist = () => {
    this.reciptionistService.getAllReciptionists().subscribe((response) => {
      this.recip = response;
    }, (error) => {
      console.log(error);
    })
  }
}


