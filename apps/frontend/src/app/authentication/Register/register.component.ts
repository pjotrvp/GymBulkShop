import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'gym-bulk-shop-register',
  templateUrl: './register.component.html',
  styleUrls: [],
})
export class RegisterComponent implements OnInit {
  user: any = {};
  subscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthService
  ) {}
  ngOnInit(): void {
    this.user = {
      email: '',
      password: '',
      name: '',
    };
    this.subscription = this.authservice
      .getUserFromLocalStorage()
      .subscribe((user) => {
        if (user) {
          this.router.navigate(['/']);
        }
      });
  }

  register() {
    this.authservice.register(this.user).subscribe({
      next: (user) => {
        if (user) {
          this.authservice.login(this.user.email, this.user.password);
        }
      },
    });
  }
}
