import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gym-bulk-shop-register',
  templateUrl: './register.component.html',
  styleUrls: [],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  register() {
    this.router.navigate(['/login']);
  }
}
