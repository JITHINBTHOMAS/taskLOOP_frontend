import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
      this.registerForm = this.fb.group({
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
          password: ['', [Validators.required, Validators.minLength(8)]]
      });
  }

  onSubmit(): void {
      if (this.registerForm.valid) {
          console.log("Registration successful", this.registerForm.value);
      }
  }
}

