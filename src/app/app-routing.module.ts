import { CanDeactivateGuardService } from './home/can-deactivate-guard.service';
import { AuthGuardService } from './auth-guard.service';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { CareProviderDirectoryComponent } from './home/care-provider-directory/care-provider-directory.component';
import { UpdatePatientsComponent } from './home/patients/update-patients/update-patients.component';
import { HealthResourcesComponent } from './home/health-resources/health-resources.component';
import { TreatmentPlansComponent } from './home/treatment-plans/treatment-plans.component';
import { LibraryComponent } from './home/library/library.component';
import { TreatmentTasksComponent } from './home/treatment-tasks/treatment-tasks.component';
import { TreatmentAlertsComponent } from './home/treatment-alerts/treatment-alerts.component';
import { MyMessagesComponent } from './home/my-messages/my-messages.component';
import { MyAlertsComponent } from './home/my-alerts/my-alerts.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { PatientsComponent } from './home/patients/patients.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
{ path: 'login', component: LogInComponent},
{ path: '', canActivate:[AuthGuardService], component: HomeComponent, children: [
    { path: 'patients', component: PatientsComponent, data: {message: 'PATIENTS'} },
    { path: 'alerts', component: MyAlertsComponent, data: {message: 'MY ALERTS'} },
    { path: 'dashboard', component: DashboardComponent, data: {message: 'DASHBOARD'} },
    { path: 'myMessages', component: MyMessagesComponent, data: {message: 'MY MESSAGES'} },
    { path: 'treatmentAlerts', component: TreatmentAlertsComponent, data: {message: 'TREATMENT ALERTS'} },
    { path: 'treatmentTasks', component: TreatmentTasksComponent, data: {message: 'TREATMENT TASKS'} },
    { path: 'treatmentPlans', component: TreatmentPlansComponent, data: {message: 'TREATMENT PLANS'} },
    { path: 'library', component: LibraryComponent, data: {message: 'LIBRARY'} },
    { path: 'healthResources', component: HealthResourcesComponent, data: {message: 'HEALTH RESOURCES'} },
    { path: 'careProvider', component: CareProviderDirectoryComponent, data: {message: 'CARE PROVIDER'} },
    { path: 'updatePatients', component: UpdatePatientsComponent, data: {message: 'UPDATE PATIENTS'} }
] }
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouting {}

