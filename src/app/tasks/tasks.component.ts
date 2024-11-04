import { Component } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks = [
    { id: 1, assigneeID: 'E001', dueDate: new Date(), status: 'Assigned', description: 'Task 1', email: 'user1@example.com' },
    { id: 2, assigneeID: 'E002', dueDate: new Date(), status: 'In Review', description: 'Task 2', email: 'user2@example.com' },
    { id: 3, assigneeID: 'E003', dueDate: new Date(), status: 'Completed', description: 'Task 3', email: 'user3@example.com' }
    // Add more tasks as needed
  ];

  // Pie Chart Data
  pieChartLabels: string[] = ['Assigned', 'In Review', 'Completed'];
  pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [0, 0, 0]
    }]
  };
  pieChartType: ChartType = 'pie';



  

  userDetails = { name: 'John Doe', email: 'johndoe@example.com', phone: '123-456-7890' };

  ngOnInit() {
    this.calculateTaskStatus();
  }

  calculateTaskStatus() {
    const statusCount = { Assigned: 0, 'In Review': 0, Completed: 0 };
    this.tasks.forEach(task => {
      statusCount[task.status as keyof typeof statusCount]++;
    });
    this.pieChartData.datasets[0].data = [statusCount.Assigned, statusCount['In Review'], statusCount.Completed];
  }

  openCreateTaskModal() {
    // Implement modal opening logic here
  }

  viewTask(task: any) {
    this.userDetails = {
      name: task.assigneeID, // Placeholder; replace with actual user data based on assigneeID
      email: task.email,
      phone: '123-456-7890'
    };
  }

  editTask(task: any) {
    // Implement task editing logic here
  }

  removeTask(taskId: any) {
    // Implement task removal logic here
  }
  
  createTask(){

  }
}
