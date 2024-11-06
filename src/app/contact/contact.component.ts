import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:8080/notifications/sendEmail', {
      toEmail: 'your-email@example.com',
      subject: 'New Contact Form Submission',
      body: `Name: ${this.contactForm.name}\nEmail: ${this.contactForm.email}\nMessage: ${this.contactForm.message}`
    }).subscribe(response => {
      alert('Message sent successfully!');
      this.contactForm = { name: '', email: '', message: '' }; // Reset form
    }, error => {
      alert('Error sending message.');
    });
  }
}
