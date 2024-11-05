import { Injectable } from '@angular/core';

export interface Employee {
  name: string;
  id: string;
  email: string;
  phone: string;
  designation: string;
}

export interface Manager {
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

export interface Task {
  id: string;
  assigneeID: string;
  dueDate: Date;
  status: string;
  description: string;
}


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }


  private employees: Employee[] = [];
  private manager!: Manager;
  private projects: Project[] = [];
  private tasks: Task[] = [];
  

  setEmployees(employees: Employee[]) {
    this.employees = employees;
  }

  getEmployees() {
    return this.employees;
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  removeEmployee(index:number){
    this.employees.splice(index,1);
  }

  setProjects(projects: Project[]) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  addProject(projects: Project) {
    this.projects.push(projects);
  }

  removeProject(index:number){
    this.projects.splice(index,1);
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  addTask(tasks: Task) {
    this.tasks.push(tasks);
  }

  removeTask(index:number){
    this.tasks.splice(index,1);
  }

  setManager(manager: Manager) {
    this.manager = manager;
  }

  getManager() {
    return this.manager;
  }
}
