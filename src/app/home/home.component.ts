import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $ : any;

export interface Employee {
  name: string;
  id: string;
  email: string;
  phone: string;
  designation: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date; 
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  isupdate:boolean = true;
  indextoremove:number = -1;

  EmpForm: FormGroup;
  ProjectForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router,private sharedDataService: SharedDataService) {
    this.EmpForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.ProjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
    });
   }

  employees: Employee[] = this.sharedDataService.getEmployees();
  projects: Project[] = this.sharedDataService.getProjects();
  manager: Employee = this.sharedDataService.getManager();
  
  newEmployee: Employee = { name: '', id: '', email: '', phone: '', designation: '' };
  newProject: Project = { id: '', name: '', description: '', startDate: new Date() };

  openAddEmployeeModal() {
    $('#addEmployeeModal').modal('show');
  }

  resetNewEmployee() {
    this.newEmployee = { name: '', id: '', email: '', phone: '', designation: '' };
  }

  toggleUpdate(){
    this.isupdate=!this.isupdate
  }
  
  addEmployee() {
    this.sharedDataService.addEmployee({ ...this.newEmployee });
    this.resetNewEmployee();
    console.warn(this.sharedDataService.getEmployees());
    $('#addEmployeeModal').modal('hide');
  }

  updateEmployee() {
    this.sharedDataService.addEmployee({ ...this.newEmployee });
    this.removeEmployee(this.indextoremove);
    this.resetNewEmployee(); 
    $('#addEmployeeModal').modal('hide'); 
    this.toggleUpdate();
  }

  removeEmployee(index: number) {
    this.sharedDataService.removeEmployee(index);
  }

  editEmployee(index: number) {
    this.toggleUpdate();
    $('#addEmployeeModal').modal('show');
    this.newEmployee = { name: this.employees[index].name, id: this.employees[index].id, email: this.employees[index].email, phone: this.employees[index].phone, designation: this.employees[index].designation };
    this.indextoremove = index;
  }

  openAddProjectModal() {
    $('#addProjectModal').modal('show');
  }

  resetNewProject() {
    this.newProject = { id: '', name: '', description: '', startDate:  new Date()};
  }


  addProject() {
    this.sharedDataService.addProject({ ...this.newProject });
    this.resetNewProject(); 
    $('#addProjectModal').modal('hide'); 
  }

  updateProject() {
    this.sharedDataService.addProject({ ...this.newProject });
    this.removeProject(this.indextoremove);
    this.resetNewProject(); 
    $('#addProjectModal').modal('hide'); 
    this.toggleUpdate();
  }
  
  
  removeProject(index: number) {
    this.sharedDataService.removeProject(index);
  }

  editProject(index: number) {
    this.toggleUpdate();
    $('#addProjectModal').modal('show');
    this.newProject = { id: this.projects[index].id, name: this.projects[index].name, description: this.projects[index].description, startDate: this.projects[index].startDate };
    this.indextoremove = index;  }

  viewTasks(projectId: string) {
    this.router.navigate(['/tasks', projectId]);
    console.warn(this.sharedDataService.getEmployees());

  }
}
