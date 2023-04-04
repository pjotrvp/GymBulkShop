import { Component, OnInit } from '@angular/core';
import { Review } from '../../Models/review.model';
import { ReviewService } from '../../Models/review.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css'],
})
export class EditReviewComponent implements OnInit {
  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) {}
  review: Review | undefined;

  ngOnInit(): void {
    this.review = this.reviewService.getReview(
      this.getReviewIdBySupplementId(this.route.snapshot.params['id'])!
    );
    console.log('edit-review: ', this.review);
  }
  getReviewIdBySupplementId(supplementId: string) {
    return this.reviewService.getReviewIdBySupplementId(supplementId);
  }

  editReview() {
    this.reviewService.updateReview(this.review!);
  }
}
