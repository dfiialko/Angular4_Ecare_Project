import { SpinnerComponent } from './../shared/spinner/spinner.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { PatientsComponent } from './home/patients/patients.component';
import { MyAlertsComponent } from './home/my-alerts/my-alerts.component';
import { MyMessagesComponent } from './home/my-messages/my-messages.component';
import { TreatmentAlertsComponent } from './home/treatment-alerts/treatment-alerts.component';
import { TreatmentTasksComponent } from './home/treatment-tasks/treatment-tasks.component';
import { TreatmentPlansComponent } from './home/treatment-plans/treatment-plans.component';
import { LibraryComponent } from './home/library/library.component';
import { HealthResourcesComponent } from './home/health-resources/health-resources.component';
import { CareProviderDirectoryComponent } from './home/care-provider-directory/care-provider-directory.component';
import { AddPatientComponent } from './home/patients/add-patient/add-patient.component';
import { DataService } from './data.service';

// Material Designs
import {MatButtonModule, MatCardModule, MatMenuModule,
  MatToolbarModule, MatIconModule, MatTableModule, MatTabsModule,
  MatProgressSpinnerModule, MatCheckboxModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdatePatientsComponent } from './home/patients/update-patients/update-patients.component';


const appRoutes: Routes = [ 
  { path: 'addPatient', component: AddPatientComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'alerts', component: MyAlertsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'myMessages', component: MyMessagesComponent },
  { path: 'treatmentAlerts', component: TreatmentAlertsComponent },
  { path: 'treatmentTasks', component: TreatmentTasksComponent },
  { path: 'treatmentPlans', component: TreatmentPlansComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'healthResources', component: HealthResourcesComponent },
  { path: 'careProvider', component: CareProviderDirectoryComponent },
  { path: 'updatePatients', component: UpdatePatientsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    PasswordResetComponent,
    HomeComponent,
    DashboardComponent,
    PatientsComponent,
    MyAlertsComponent,
    MyMessagesComponent,
    TreatmentAlertsComponent,
    TreatmentTasksComponent,
    TreatmentPlansComponent,
    LibraryComponent,
    HealthResourcesComponent,
    CareProviderDirectoryComponent,
    AddPatientComponent,
    UpdatePatientsComponent,
    SpinnerComponent
],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    MatButtonModule, 
    MatCardModule,
     MatMenuModule, 
     MatToolbarModule, 
     MatIconModule, 
     MatTableModule,
     BrowserAnimationsModule ,
     MatTabsModule,
     MatProgressSpinnerModule,
     MatCheckboxModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
