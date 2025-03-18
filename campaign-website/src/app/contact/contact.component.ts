import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name = '';
  email = '';
  amount = '';
  message = '';

  // dagdag mula pa reng aliwa mu fields keni

  submitted = false;
  success = '';
  error = '';

  // onSubmit() {
  //   console.log('Form submitted!');
  //   console.log('Name:', this.name);
  //   console.log('Email:', this.email);
  //   console.log('Message:', this.message);
  // }

  formData: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    amount: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    // dagdag mula pa reng aliwa mu fields keni
  });

  constructor(private http: HttpClient) { }

  onSubmit(){
    if (this.formData.valid){
      this.submitted = true;
      
      this.http.post('http://localhost:5038/api/donate/AddDonation', this.formData.value).subscribe({
      // this.http.post('https://bangketa-eskwela-backend.onrender.com/admin/contact', this.formData.value).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.success = 'Message sent successfully!';
          this.formData.reset();
        },
        error: (error) => {
          console.error('Error:', error);
          this.error = 'Failed to send message. Please try again later.';
        },
        complete: () => {
          this.submitted = false;
        }
      });
    }
  }
}
