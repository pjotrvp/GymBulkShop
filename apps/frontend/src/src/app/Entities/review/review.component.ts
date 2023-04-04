import { Component, Input, OnInit } from '@angular/core';
import {Review} from '../../Models/review.model';
import {ReviewService} from '../../Models/review.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'review-component',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit{
  @Input() review: Review | undefined;
  constructor(private reviewService : ReviewService,
    private route : ActivatedRoute) 
    {}
   
    readmode : boolean = true;
  editmode : boolean = false;
  ngOnInit(): void {
    this.review = this.reviewService.getReview(
      this.getReviewIdBySupplementId(this.route.snapshot.params['id'])!
    );
    
    console.log('reviewcomponent: ', this.review);
  }

  toggleReadMode() {
    this.readmode = !this.readmode;
    this.editmode = !this.editmode;
  }

  getReviewIdBySupplementId(supplementId : string) {
    return this.reviewService.getReviewIdBySupplementId(supplementId);
  }

  deleteReview() {
    console.log('delete review: ', this.review?._id);
    this.reviewService.deleteReview(this.review!._id!);
  }
}



