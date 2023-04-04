import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../Models/user.model';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'gym-bulk-shop-login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent implements OnInit {
  subscription!: Subscription;
  user: any = {};

  constructor(private router: Router, private authservice: AuthService) {}

  ngOnInit(): void {
    this.user = new User('', '', '', '');
    this.subscription = this.authservice
      .getUserFromLocalStorage()
      .subscribe((user) => {
        if (user) {
          this.router.navigate(['/']);
        }
      });
  }

  login() {
    this.subscription = this.authservice
      .getUserByEmail(this.user.email)
      .subscribe({
        next: (user) => {
          if (user) {
            if (user.email === this.user.email) {
              this.authservice.login(this.user.email, this.user.password);
            } else {
              window.alert('Invalid credentials');
            }
          } else {
            window.alert('User not found!');
          }
        },
      });
  }
}
