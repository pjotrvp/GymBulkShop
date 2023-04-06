import { Component, OnInit } from '@angular/core';
import { Supplement } from '../../Models/supplement.model';
import { SupplementService } from '../../Models/supplement.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../authentication/Services/auth.service';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  supplements: Supplement[] = [];
  subscription!: Subscription;
  user: User | undefined;

  constructor(
    private supplementService: SupplementService,
    private authService: AuthService
  ) {
    console.log('ProductListComponent constructor');
  }

  ngOnInit() {
    this.subscription = this.supplementService.list().subscribe({
      next: (supplements) => {
        this.supplements = supplements!;
      },
      error: (err) => {
        console.log('Error in SupplementList: ' + err);
      },
    });

    this.subscription = this.authService
      .getUserFromLocalStorage()
      .subscribe((user) => {
        if (user) {
          this.user = user!;
        }
      });
  }
}
