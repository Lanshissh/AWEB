import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title = 'donationapp';
  //set the link of the based route
  readonly APIUrl="http://localhost:5038/api/donate/GetDonations";
  

  constructor(private http:HttpClient){
  }
  //initialize the books array
  donations :any=[];
  displayedColumns: string[] = ['id', 'name', 'email', 'amount', 'message'];
  errorMessage = '';

  // refreshBooks(){
  //   this.http.get(this.APIUrl).subscribe(data=>{
  //     this.donations=data;
  //   })
  // }

  fetchDonations() {
        this.http.get<any[]>('http://localhost:5038/api/donate/GetDonations').subscribe({
          next: (data) => {
            this.donations = data;
          },
          error: (error) => {
            console.error('Error fetching donations:', error);
            this.errorMessage = 'Failed to load donations. Please try again later.';
          },
        });
      }
  ngOnInit(){
    this.fetchDonations();
  }

  addBook(){
    var newBook=(<HTMLInputElement>document.getElementById("newBook")).value;
    var newDesc=(<HTMLInputElement>document.getElementById("newDesc")).value;
    var newPrice=(<HTMLInputElement>document.getElementById("newPrice")).value;
    var formData=new FormData();
    formData.append("title", newBook);
    formData.append("description", newDesc);
    formData.append("price", newPrice.toString());
    this.http.post(this.APIUrl+'AddBook', formData).subscribe(data=>{
      alert(data);
      this.fetchDonations()
    })
  }
  
  deleteBook(id:any){
      this.http.delete(this.APIUrl+'DeleteBook?id='+id).subscribe(data=>{
      alert(data);
      this.fetchDonations()
    })
  }
}

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { MatTableModule } from '@angular/material/table';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-admin',
//   standalone: true,
//   imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
//   templateUrl: './admin.component.html',
//   styleUrls: ['./admin.component.css'],
// })
// export class AdminComponent implements OnInit {
//   donations: any[] = [];
//   displayedColumns: string[] = ['id', 'name', 'email', 'amount', 'status', 'actions'];
//   loading = true;
//   errorMessage = '';

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.fetchDonations();
//   }

//   // Fetch donations from the backend
//   fetchDonations() {
//     this.http.get<any[]>('http://localhost:5038/api/donate/AddDonation').subscribe({
//       next: (data) => {
//         this.donations = data;
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Error fetching donations:', error);
//         this.errorMessage = 'Failed to load donations. Please try again later.';
//         this.loading = false;
//       },
//     });
//   }

//   deleteDonation(id: string) {
//     if (!confirm('Are you sure you want to delete this donation?')) {
//       return;
//     }
//     this.http.delete(`http://localhost:5038/api/donate/AddDonation${id}`).subscribe({
//       next: () => {
//         this.donations = this.donations.filter((donation) => donation.id !== id);
//         console.log('Donation deleted successfully.');
//       },
//       error: (error) => {
//         console.error('Error deleting donation:', error);
//         this.errorMessage = 'Failed to delete donation. Please try again later.';
//       },
//     });
//   }

//   acceptDonation(id: string) {
//     this.http.patch(`http://localhost:5038/api/donate/AddDonation${id}`, { status: 'Accepted' }).subscribe({
//       next: () => {
//         const donation = this.donations.find((d) => d.id === id);
//         if (donation) donation.status = 'Accepted';
//         console.log('Donation accepted successfully.');
//       },
//       error: (error) => {
//         console.error('Error accepting donation:', error);
//         this.errorMessage = 'Failed to accept donation. Please try again later.';
//       },
//     });
//   }

//   cancelDonation(id: string) {
//     this.http.patch(`http://localhost:5038/api/donate/AddDonation${id}`, { status: 'Cancelled' }).subscribe({
//       next: () => {
//         const donation = this.donations.find((d) => d.id === id);
//         if (donation) donation.status = 'Cancelled';
//         console.log('Donation cancelled successfully.');
//       },
//       error: (error) => {
//         console.error('Error cancelling donation:', error);
//         this.errorMessage = 'Failed to cancel donation. Please try again later.';
//       },
//     });
//   }
// }