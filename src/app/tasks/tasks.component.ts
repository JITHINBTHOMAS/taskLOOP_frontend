import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { Employee, SharedDataService } from '../shared-data.service';
declare var $ : any;

export interface Task {
  id: string;
  assigneeID: string;
  dueDate: Date;
  status: string;
  description: string;
}


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit{
  public chart: any;
  tasks: Task[] = this.sharedDataService.getTasks();
  isupdate:boolean = true;
  indextoremove:number = -1;
  newTask: Task = { id: '', assigneeID: '',dueDate: new Date(),status:'', description: '',  };
  projectId:string= String(this.route.snapshot.paramMap.get('id'));
  selectedTask: Task | null = null;  
  employees: Employee[] = this.sharedDataService.getEmployees();;
  userDetails = {id:'', name: '', email: '', phone: '' ,designation:''};

  constructor(private route: ActivatedRoute,private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.createChart();
  }
  

  createChart() {
    if (!this.chart) { 
        this.chart = new Chart("MyChart", {
            type: 'pie',
            data: {
                labels: ['Assigned', 'In Review', 'Completed'],
                datasets: [{
                    label: 'Status report',
                    data: [0, 0, 100],
                    backgroundColor: [
                        'blue',    
                        'yellow',  
                        'green'  
                    ],
                    hoverOffset: 4
                }],
            },
            options: {
                aspectRatio: 2.5
            }
        });
    }
    else{
      console.error("help");
      
    }
}


  editTaskStatus(task: Task) {
    this.selectedTask = task; 
    $('#statusUpdateModal').modal('show'); 
  }

  updateTaskStatus(newStatus: string) {
    if (this.selectedTask) {
      this.selectedTask.status = newStatus;
      this.chart.update();
      this.calculateTaskStatus();
     } 
      $('#statusUpdateModal').modal('hide'); 
  }


  openCreateTaskModal() {
    $('#addTaskModal').modal('show');
    console.warn(this.employees);
    
  }

  resetNewTask() {
    this.newTask =  { id: '', assigneeID: '',dueDate: new Date(), status: 'Assigned', description: '',  };
  }

  toggleUpdate(){
    this.isupdate=!this.isupdate
  }
  
  addTask() {
    this.newTask.status = 'Assigned';
    this.sharedDataService.addTask({ ...this.newTask })
    this.resetNewTask(); 
    $('#addTaskModal').modal('hide'); 
    this.calculateTaskStatus();
    this.chart.update();
  }
  updateTask() {
    this.sharedDataService.addTask({ ...this.newTask })
    this.removeTask(this.indextoremove);
    this.resetNewTask(); 
    $('#addTaskModal').modal('hide'); 
    this.toggleUpdate();
  }

  removeTask(index: number) {
    this.sharedDataService.removeTask(this.indextoremove)
  }

  calculateTaskStatus() {
    const statusCount = { Assigned: 0, InReview: 0, Completed: 0};
    this.tasks.forEach(task => {
        statusCount[task.status as keyof typeof statusCount]++;
    });

    if (this.chart && this.chart.data.datasets && this.chart.data.datasets.length > 0) {
        this.chart.data.datasets[0].data = [
            statusCount.Assigned, 
            statusCount.InReview, 
            statusCount.Completed
        ];
        this.chart.update(); 
    } else {
        console.error('Chart is not initialized or datasets are missing.');
    }
}




  viewTask(task: Task) {
    const employee = this.employees.find(emp => emp.id === task.assigneeID);
        if (employee) {
      this.userDetails = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        designation: employee.designation
      };
    } else {
      console.warn(`Employee with ID ${task.assigneeID} not found`);
      this.userDetails = {
        id: task.assigneeID,
        name: 'Unknown',
        email: 'N/A',
        phone: 'N/A',
        designation: 'N/A'
      };
    }
    console.log(this.projectId);
    console.log(this.employees);
  }

}
