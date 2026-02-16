import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 
export class ChangePasswordComponent {
  passwordData = { oldPassword: '', newPassword: '' };



  changePassword(): void {
    this.userService.changePassword(this.passwordData).subscribe({
      next: () => {
        alert('Password changed successfully!');
        this.router.navigate(['/profile']);
      },
      error: (err) => alert('Error: ' + err.error.message)
    });
  }
}