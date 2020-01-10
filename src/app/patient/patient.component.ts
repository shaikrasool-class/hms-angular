import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
patients: Patient [] = [];
  constructor(private patientService:PatientService,  private _router : Router ) { }

  ngOnInit() {
  }
  getDocotor() {
    console.log("somethig try")
    this._router.navigate(["/doctor"]);

  }
}
