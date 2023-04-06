import { Component, OnInit } from '@angular/core';
import { Supplement } from '../../Models/supplement.model';
import { SupplementService } from '../../Models/supplement.service';
import { Review } from '../../Models/review.model';
import { ReviewService } from '../../Models/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../authentication/Services/auth.service';
import { User } from '../../Models/user.model';
import { UserService } from '../../Models/user.service';

@Component({
  selector: 'gym-bulk-shop-supplement',
  templateUrl: './supplement.component.html',
  styleUrls: ['./supplement.component.css'],
})
export class SupplementComponent implements OnInit {
  reviews: Review[] = [];
  supplement: Supplement | undefined;
  supplementId: string = '';
  subscription!: Subscription;
  user: User | undefined;
  userId: string | undefined;

  constructor(
    private supplementService: SupplementService,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private authService: AuthService,
    private userService: UserService
  ) {
    console.log('SupplementComponent constructor');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      // Get the supplement id from the url
      this.supplementId = this.route.snapshot.params['id'];

      // Get the supplement from the backend
      this.subscription = this.supplementService
        .read(this.supplementId)
        .subscribe({
          next: (supplement) => {
            this.supplement = supplement;
          },
          error: (err) => {
            console.log(
              'Error in Supplement with retrieving supplement: ' + err
            );
          },
        });
    });

    // Get the reviews from the backend
    this.subscription = this.reviewService.list().subscribe({
      next: (reviews) => {
        this.reviews = reviews!;
      },
      error: (err) => {
        console.log('Error in Supplement with retrieving reviews: ' + err);
      },
    });

    // Get the user from the backend
    this.getUser();
  }

  getUser() {
    this.user = undefined;
    this.userId = undefined;
    this.subscription = this.authService
      .getUserFromLocalStorage()
      .subscribe((user) => {
        if (user) {
          this.userId = this.authService.getUserIdFromLocalStorage();
          this.subscription = this.userService.read(this.userId).subscribe({
            next: (user) => {
              this.user = user;
              console.log(`Current user: ${this.user?._id}`);
            },
          });
        } else {
          console.log('No user found');
        }
      });
  }

  deleteSupplement() {
    const text = `Are you sure you want to delete this supplement?`;
    if (confirm(text)) {
      this.subscription = this.supplementService
        .delete(this.supplementId)
        .subscribe({
          next: () => {
            console.log('Supplement deleted');
            this.router.navigate(['/supplements']);
          },
          error: (err) => {
            console.log('Error in Supplement with deleting supplement: ' + err);
          },
        });
    } else {
      return;
    }
  }
}
