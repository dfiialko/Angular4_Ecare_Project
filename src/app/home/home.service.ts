import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
    componentName = 'component';
    private links = [
        ['DASHBOARD', '/dashboard', 'house', 'DASHBOARD'],
        ['PATIENTS', '/patients', 'avatar', 'PATIENTS'],
        ['MY ALERTS', '/alerts', 'star', 'MY ALERTS'],
        ['MY MESSAGES', '/myMessages', 'envelope', 'MESSAGES'],
        ['TREATMENT ALERTS', '/treatmentAlerts', 'speaker', 'ALERTS'],
        ['TREATMENT TASK', '/treatmentTasks', 'book', 'TASKS'],
        ['TREATMENT PLANS', '/treatmentPlans', 'heart', 'PLANS'],
        ['LIBRARY', '/library', 'copy', 'LIBRARY'],
        ['HEALTH RESOURCES', '/healthResources', 'glasses', 'RESOURCES'],
        ['CARE PROVIDER DIRECTORY', '/careProvider', 'phone-call', 'PROVIDER']
    ];

    constructor() {

    }
    getLinks() {
        return this.links;
    }
  

}