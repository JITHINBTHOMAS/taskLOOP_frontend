import { Component } from '@angular/core';
// import * as $ from 'jquery';
declare var $ : any;

// import Chart from 'chart.js/auto';
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
  startDate: Date; // You might want to use Date type based on your needs
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  isupdate:boolean = true;
  indextoremove:number = -1;
  // title = 'ng-chart';
  // chart: any = [];

  // constructor() {}

  // ngOnInit() {
  //   this.chart = new Chart('canvas', {
  //     type: 'bar',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [
  //         {
  //           label: '# of Votes',
  //           data: [12, 19, 3, 5, 2, 3],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }

  employees: Employee[] = [];
  projects: Project[] = [];
  manager: Employee | null = null; // Assign if manager details are available
  
  newEmployee: Employee = { name: '', id: '', email: '', phone: '', designation: '' };
  newProject: Project = { id: '', name: '', description: '', startDate: new Date() };

  openAddEmployeeModal() {
    // Use jQuery to show the modal
    $('#addEmployeeModal').modal('show');
  }

  resetNewEmployee() {
    this.newEmployee = { name: '', id: '', email: '', phone: '', designation: '' };
  }

  toggleUpdate(){
    this.isupdate=!this.isupdate
  }
  openAddProjectModal() {
    $('#addProjectModal').modal('show');
  }

  resetNewProject() {
    this.newProject = { id: '', name: '', description: '', startDate:  new Date()};
  }

  addEmployee() {
    this.employees.push({ ...this.newEmployee });
    this.resetNewEmployee(); // Reset the form fields
    $('#addEmployeeModal').modal('hide'); // Hide the modal
  }
  updateEmployee() {
    this.employees.push({ ...this.newEmployee });
    this.removeEmployee(this.indextoremove);
    this.resetNewEmployee(); // Reset the form fields
    $('#addEmployeeModal').modal('hide'); // Hide the modal
    this.toggleUpdate();
  }

  addProject() {
    this.projects.push({ ...this.newProject });
    this.resetNewProject(); // Reset the form fields
    $('#addProjectModal').modal('hide'); // Hide the modal
  }

  updateProject() {
    this.projects.push({ ...this.newProject });
    this.removeProject(this.indextoremove);
    this.resetNewProject(); // Reset the form fields
    $('#addProjectModal').modal('hide'); // Hide the modal
    this.toggleUpdate();
  }
  removeEmployee(index: number) {
    this.employees.splice(index, 1); // Remove employee by index
  }

  editEmployee(index: number) {
    this.toggleUpdate();
    $('#addEmployeeModal').modal('show');
    this.newEmployee = { name: this.employees[index].name, id: this.employees[index].id, email: this.employees[index].email, phone: this.employees[index].phone, designation: this.employees[index].designation };
    this.indextoremove = index;
  }

  
  removeProject(index: number) {
    this.projects.splice(index, 1); // Remove project by index
  }

  editProject(index: number) {
    this.toggleUpdate();
    $('#addProjectModal').modal('show');
    this.newProject = { id: this.projects[index].id, name: this.projects[index].name, description: this.projects[index].description, startDate: this.projects[index].startDate };
    this.indextoremove = index;  }

  viewTasks(projectId: string) {
    // Logic to view tasks for a project
  }
}
