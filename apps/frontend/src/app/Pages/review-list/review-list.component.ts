import { Component, OnInit} from '@angular/core';
import { Review } from '../../Models/review.model';
import { ReviewService } from '../../Models/review.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent implements OnInit {
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService,
    private route: ActivatedRoute) {}
    
    ngOnInit(): void {
      this.reviews = this.reviewService.getReviewsBySupplementId(
        this.route.snapshot.params['id']
      );
    }
  }




