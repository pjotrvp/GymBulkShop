import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gym-bulk-shop-login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login() {
    this.router.navigate(['/home']);
  }
}
