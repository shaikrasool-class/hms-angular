import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgModule, Component } from '@angular/core';

import {NgxPaginationModule} from 'ngx-pagination';

import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SearchPipe} from './providers/search.pipe';
import { AdminListComponent } from './admin-list/admin-list.component';
import { HospitalComponent } from './hospital/hospital.component';
import { Hospital } from './models/hospital';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientComponent } from './patient/patient.component';
import { NurseListComponent } from './nurse-list/nurse-list.component';
import { NurseComponent } from './nurse/nurse.component';
import { PharmacistListComponent } from './pharmacist-list/pharmacist-list.component';
import { LaboratoristListComponent } from './laboratorist-list/laboratorist-list.component';
import { AccountantListComponent } from './accountant-list/accountant-list.component';
import { ReciptionistListComponent } from './reciptionist-list/reciptionist-list.component';
import { PatientPipe } from './providers/patient.pipe';
import { NursePipe } from './providers/nurse.pipe';
import { PharmacistPipe } from './providers/pharmacist.pipe';
import { LaboratoristPipe } from './providers/laboratorist.pipe';
import { AccountantPipe } from './providers/accountant.pipe';
import { ReciptionistPipe } from './providers/reciptionist.pipe';
import { ManageHospitalComponent } from './manage-hospital/manage-hospital.component';

const appRoutes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'users',  component: UserComponent },
  { path: 'adminsPro', component: AdminListComponent},
  { path: 'hospital', component: HospitalComponent},
  { path: 'hospital/:hospId/doctor-list', component: DoctorListComponent},
  { path: 'hospital/patient-list', component: PatientListComponent },
  { path: 'hospital/nurse-list', component:NurseListComponent},
  { path: 'doctor-list', component: DoctorListComponent},
  { path: 'patient-list', component: PatientListComponent },
  { path: 'doctor/patient-list', component: PatientListComponent },
  { path: 'doctor', component: DoctorComponent},
  { path: 'nurse-list', component:NurseListComponent},
  { path: 'pharmacist-list', component:PharmacistListComponent},
  { path: "patient", component:PatientComponent},
  { path: 'laboratorist-list', component:LaboratoristListComponent},
  { path: 'accountant-list', component:AccountantListComponent},
  { path: 'reciptionist-list', component:ReciptionistListComponent},
  { path: 'manageHospital', component:ManageHospitalComponent},
  { path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  { path: '**', component: AppComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SearchPipe,
    AdminListComponent,
    HospitalComponent,
    DoctorListComponent,
    DoctorComponent,
    PatientListComponent,
    NurseListComponent,
    PatientComponent,
    NurseComponent,
    PharmacistListComponent,
    LaboratoristListComponent,
    AccountantListComponent,
    ReciptionistListComponent,
    PatientPipe,
    NursePipe,
    PharmacistPipe,
    LaboratoristPipe,
    AccountantPipe,
    ReciptionistPipe,
    ManageHospitalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
